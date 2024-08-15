import React from 'react'
import  {CircleAlert} from 'lucide-react';
const AlertMessage = ({ msg }) => {
    return (
        <div className="p-4 bg-red-500 mt-5 text-white rounded-md flex gap-5 items-center">
            <CircleAlert />
            {msg}
        </div>
    )
}

export default AlertMessage
