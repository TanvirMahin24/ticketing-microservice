import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import React from "react";
import Swal from "sweetalert2";
import Navbar from "../../components/Navbar/Navbar";
import useRequet from "../../hooks/useRequest";

const TicketDetails = ({ currentUser, data }) => {
  const router = useRouter();

  if (!data) {
    router.push("/");
    return <>Not Found</>;
  }

  const { request } = useRequet({
    method: "post",
    url: `/api/orders`,
    body: {
      ticketId: data.id,
    },
    onSuccess: (order) => {
      Swal.fire({
        title: "Success!",
        text: "Ticket Ordered!",
        icon: "success",
      });

      router.push(`/orders/${order.id}`);
    },
  });
  return (
    <div>
      <Navbar currentUser={currentUser} />
      <div className="w-25rem px-4 mx-auto">
        <Card>
          <h4>{data.title}</h4>
          <h5>Price: ${data.price}</h5>
          <Button label="Order Ticket Now" onClick={() => request()}></Button>
        </Card>
      </div>
    </div>
  );
};

TicketDetails.getInitialProps = async (ctx, client) => {
  const { ticketId } = ctx.query;
  const { data } = await client.get(`/api/tickets/${ticketId}`);

  return { data };
};

export default TicketDetails;
