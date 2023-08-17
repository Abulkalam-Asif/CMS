import React from "react";
import { H2, HR, ListItem } from "../components";

const List = ({ heading, titles, descriptions }) => {
  return (
    <>
      <div className="max-w-2xl my-4 p-4 mx-auto bg-white shadow-md rounded-lg">
        <H2
          content={heading}
          className="w-fit mx-auto mb-8 border-b-2 border-pink-700"
        />
        <dl>
          {titles.map((title, index) => {
            return (
              <div key={index}>
                <ListItem title={title} description={descriptions[index]} />
                {index !== titles.length - 1 && <HR thickness="thin" />}
              </div>
            );
          })}
        </dl>
      </div>
    </>
  );
};

export default List;
