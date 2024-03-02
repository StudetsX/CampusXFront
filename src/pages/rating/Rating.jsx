// libs
import { useState, useEffect } from "react";

// context
import { REST } from "../../env/config";

// styles
import "./Rating.scss";

function Rating() {
   const [lastName, setLastName] = useState("");
   const [allGroups, setAllGroups] = useState([]);
   const [group, setGroup] = useState("");
   const [sort, setSort] = useState(0);

   const [students, setStudents] = useState([]);

   useEffect(() => {
      (async () => {
         const grps = fetch(REST.findAllGroups).then((res) => res.json());
         setAllGroups(grps);
      })();
   }, []);

   useEffect(() => {
      // test data
      // const testStudents = [
      //    { id: 23, name: "Oleg" },
      //    { id: 21, name: "Oleg2" }
      // ];
      // setStudents(testStudents);

      (async () => {
         const users = fetch(REST.rating(group, lastName)).then((res) =>
            res.json()
         );
         setStudents(users);
      })();
   }, [group, lastName]);
   return (
      <div className="rating">
         <h1>Рейтинг</h1>
         <ParamBar
            lastName={lastName}
            setLastName={setLastName}
            allGroups={allGroups}
            setAllGroups={setAllGroups}
            group={group}
            setGroup={setGroup}
            sort={sort}
            setSort={setSort}
         />
         <DisplayUsers students={students} />
      </div>
   );
}

function ParamBar({
   lastName,
   setLastName,
   allGroups,
   setAllGroups,
   group,
   setGroup,
   sort,
   setSort
}) {
   return (
      <ul className="params">
         <li>
            <input
               className="text-field"
               type="text"
               value={lastName}
               onChange={({ target }) => {
                  setLastName(target.value);
               }}
            />
         </li>
         <li>
            <label className="select-container">
               <p>Група</p>
               <select
                  value={group}
                  onChange={({ target }) => {
                     setGroup(target.value);
                  }}
               >
                  {allGroups.map((grp) => (
                     <option value={grp.id}>{grp.name}</option>
                  ))}
               </select>
            </label>
         </li>
         {/* <li>
            <input
               type="checkbox"
               checked={sort}
               onChange={({ target }) => setSort(target.checked)}
            />
         </li> */}
      </ul>
   );
}

function DisplayUsers({ students }) {
   return (
      <ul className="display-students">
         {students.map((student) => (
            <li>{JSON.stringify(student)}</li>
         ))}
      </ul>
   );
}

export default Rating;
