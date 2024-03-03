const BS = "http://ec2-34-201-106-40.compute-1.amazonaws.com/api/v2";
const REST = {
   reg: `${BS}/registration`,
   log: `${BS}/login`,
   rating: (grp, lstn) => `${BS}/users?group=${grp}&lastName=${lstn}`,
   findAllChairs: `${BS}/findAllChairs`,
   findAllGroups: `${BS}/findAllGroups`,
   findAllSubjects: `${BS}/findAllSubjects`,

   createTest: `${BS}/createTest`,
   tests: (groupId) => `${BS}/tasks/${groupId}`,
   test: (testId) => `${BS}/task/${testId}`,
   sendTest: (testId) => `${BS}/sendTest/${testId}`,

   user: (userId) => `${BS}/user/${userId}`
};

export { REST };
