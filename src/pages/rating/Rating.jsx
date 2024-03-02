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
      setAllGroups([
         { id: 23, name: "Oleg" },
         { id: 21, name: "Oleg2" }
      ]);

      // (async () => {
      //    const grps = fetch(REST.findAllGroups).then((res) => res.json());
      //    console.log(grps);
      //    setAllGroups(grps);
      // })();

      // test data
      const testStudents = [
         {
            id: 23,
            firstName: "Oleg",
            lastName: "Olegov",
            group: "Tv-22",
            rating: 87
         },
         {
            id: 238,
            firstName: "Oleg2",
            lastName: "Olegov3",
            group: "Tv-21",
            rating: 63
         }
      ];
      setStudents(testStudents);
   }, []);

   // useEffect(() => {
   //    // test data
   //    (async () => {
   //       const users = fetch(REST.rating(group, lastName)).then((res) =>
   //          res.json()
   //       );
   //       console.log(users);
   //       setStudents(users);
   //    })();
   // }, [group, lastName]);
   return (
      <div className="rating">
         <h1>Рейтинг студентів</h1>
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
      <table className="display-students">
         <tr>
            <th>№</th>
            <th>Прізвище Ім’я</th>
            <th>Група</th>
            <th>Рейтинг</th>
         </tr>
         {students.map((student, i) => (
            <DisplayUser student={student} key={i} number={i}/>
         ))}
      </table>
   );
}

function DisplayUser({ student, number }) {
   return (
      <tr>
         <td className="number">{number+1}</td>
         <td className="names">
            <span>{student.firstName}</span>
            <span>{student.lastName}</span>
         </td>
         <td className="group">{student.group}</td>
         <td className="mark">{student.rating}</td>
         {/* <div className="names-group">
            <div className="names">
               <p>{student.firstName}</p>
               <p>{student.lastName}</p>
            </div>
            <p className="group">{student.group}</p>
         </div>
         <div className="mark">{student.rating}</div> */}
      </tr>
   );
}

export default Rating;
