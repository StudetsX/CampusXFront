import React from 'react'

function User() {
   return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="28"
        height="32"
        fill="none"
        viewBox="0 0 28 32"
      >
        <path
          fill="#DB195B"
          d="M19 8A5 5 0 109 8a5 5 0 0010 0zM6 8a8 8 0 1116 0A8 8 0 016 8zM3.081 29H24.92a8.147 8.147 0 00-8.063-7h-5.712a8.146 8.146 0 00-8.063 7zM0 30.144C0 23.988 4.987 19 11.144 19h5.712C23.012 19 28 23.988 28 30.144A1.857 1.857 0 0126.144 32H1.856A1.857 1.857 0 010 30.144z"
        ></path>
      </svg>
    );
}

function Cross(){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="28"
      height="27"
      fill="none"
      viewBox="0 0 28 27"
    >
      <path
        fill="#F9F9FA"
        d="M26.55 5.06a2.496 2.496 0 000-3.628 2.748 2.748 0 00-3.775 0L14 9.872 5.217 1.44a2.748 2.748 0 00-3.775 0 2.496 2.496 0 000 3.628l8.783 8.432-8.775 8.44a2.496 2.496 0 000 3.628c1.042 1 2.733 1 3.775 0L14 17.128l8.783 8.432c1.042 1 2.734 1 3.775 0a2.496 2.496 0 000-3.628L17.775 13.5l8.775-8.44z"
      ></path>
    </svg>
  );
}

function Plus(){
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      fill="none"
      viewBox="0 0 54 54"
    >
      <path
        fill="#F9F9FA"
        d="M27 54a27 27 0 100-54 27 27 0 000 54zm-2.531-17.719v-6.75h-6.75A2.525 2.525 0 0115.187 27a2.525 2.525 0 012.532-2.531h6.75v-6.75A2.525 2.525 0 0127 15.187a2.525 2.525 0 012.531 2.532v6.75h6.75A2.525 2.525 0 0138.813 27a2.525 2.525 0 01-2.532 2.531h-6.75v6.75A2.525 2.525 0 0127 38.813a2.525 2.525 0 01-2.531-2.532z"
      ></path>
    </svg>
  );
}

export {User, Cross, Plus};