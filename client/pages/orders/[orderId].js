import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import useRequet from "../../hooks/useRequest";
import StripeCheckout from "react-stripe-checkout";

const OrderDetails = ({ currentUser, data }) => {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);
  useEffect(() => {
    const func = () => {
      const msLeft = new Date(data.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };
    func();
    const timerId = setInterval(func, 1000);

    return () => {
      clearInterval(timerId);
    };
  });

  if (!data) {
    router.push("/");
    return <>Not Found</>;
  }

  const { request } = useRequet({
    method: "post",
    url: `/api/payments`,
    body: {
      orderId: data.id,
    },
    onSuccess: () => {
      Swal.fire({
        title: "Success!",
        text: "Ticket Payment done!",
        icon: "success",
      });

      router.push("/dashboard");
    },
  });
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <div className="w-25rem mx-auto">
        <Card>
          <h4>{data?.ticket.title}</h4>
          <h4>Status: {data?.status}</h4>
          <h5>
            {timeLeft > 0
              ? `${timeLeft} seconds Untill expires`
              : "Ticket expired!"}
          </h5>
          {timeLeft > 0 ? (
            <StripeCheckout
              stripeKey="pk_test_51KcT8XLR0CNPqZD3WW6PSCuhCUOTvGxoTi16mCslMhK2m2rEzeTeoALpQjh2cK5UWSf7HN8Bg3O6V6fqQfk3fP8a00AhQcP7pe"
              amount={data.price * 100}
              token={({ id }) => request({ token: id })}
              email={currentUser.email}
            />
          ) : (
            <></>
          )}
        </Card>
      </div>
    </div>
  );
};

OrderDetails.getInitialProps = async (ctx, client) => {
  const { orderId } = ctx.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { data };
};

export default OrderDetails;
