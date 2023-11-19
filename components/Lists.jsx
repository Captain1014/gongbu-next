
import React from 'react';
import { getLists } from './GetLists';



async function Lists({lists}){
  


  return (
    <>
      {lists.map((list, index) => (
        <div
          key={index}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 id="read-word">{list.korean}</h2>
            <h2>{list.meaning}</h2>
          </div>
        </div>
      ))}
    </>
  );
};

export default Lists;
