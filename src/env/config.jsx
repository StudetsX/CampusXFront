const BS = "http://localhost:8080/api/v2";
const REST = {
   reg: `${BS}/registration`,
   log: `${BS}/login`,
   rating: (grp, lstn) => `${BS}users?group=${grp}&lastName=${lstn}`,
   findAllChairs: `${BS}/findAllChairs`,
   findAllGroups: `${BS}/findAllGroups`,
   findAllSubjects: `${BS}/findAllSubjects`,

   createTest: `${BS}/createTest`,
   tests: (groupId)=>`${BS}/tasks/${groupId}`,
   test: (testId) => `${BS}/task/${testId}`,
   sendTest: (testId) => `${BS}/sendTest/${testId}`,


   user: (userId) => `${BS}/user/${userId}`
};

export { REST };
