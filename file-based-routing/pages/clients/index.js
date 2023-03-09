import React from "react";
import Link from "next/link";

const ClientsPage = () => {
  const clients = [
    { id: "max", name: "Maximilian" },
    { id: "marcel", name: "Marcel" },
  ];

  return (
    <div>
      <h1>The Clients Page</h1>
      <ul>
        <li>
          <Link href="/clients/marek">Marek</Link>
        </li>
        <li>
          <Link href="/clients/marcin">Marcin</Link>
        </li>
        {clients.map((client) => {
          return (
            <li key={client.id}>
              <Link
                href={{
                  pathname: "clients/[id]",
                  query: {
                    id: client.id,
                  },
                }}
              >
                {client.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ClientsPage;
