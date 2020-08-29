import React from "react";

const User = ({ user }) => {
  return (
    <tr>
      <td className="px-6 py-4 whitespace-no-wrap">
        <div className="flex items-center">
          <div className="flex-shrink-0 h-10 w-10">
            <img className="h-10 w-10 rounded-full" src={user.avatar} alt="" />
          </div>
          <div className="ml-4">
            <div className="text-sm leading-5 font-medium text-gray-900">
              {user.first_name} {user.last_name}
            </div>
            <div className="text-sm leading-5 text-gray-500">{user.email}</div>
          </div>
        </div>
      </td>
    </tr>
  );
};

export default User;
