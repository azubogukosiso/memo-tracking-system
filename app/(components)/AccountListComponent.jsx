"use client";

import AccountCard from "@/app/(components)/AccountCardComponent";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const AccountListComponent = () => {
  const [accountList, setAccountList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [approveLoading, setApproveLoading] = useState(false);
  const [disapproveLoading, setDisapproveLoading] = useState(false);
  const [disapproveDisabled, setDisapproveDisabled] = useState(false);
  const [approveDisabled, setApproveDisabled] = useState(false);

  const getUsers = async () => {
    try {
      const res = await fetch('/api/Users');
      const users = await res.json();
      setAccountList(users.message);
      setIsLoading(false);
    } catch (error) {
      console.log("Failed to get users", error);
      toast.success(error, { duration: 6000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
    }
  }

  const approveAccount = async (account_id) => {
    setApproveLoading(true);
    setApproveDisabled(true);
    setDisapproveDisabled(true);

    const res = await fetch(`/api/Users?id=${account_id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isApproved: true
      }),
      "content-type": "application/json"
    })
    const decRes = await res.json();

    if (res.ok) {
      toast.success(decRes.message, { duration: 6000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
      setApproveLoading(false);
      setApproveDisabled(false);
      setDisapproveDisabled(false);
      getUsers();
    } else {
      toast.error(decRes.message, { duration: 6000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
      setApproveLoading(false);
      setApproveDisabled(false);
      setDisapproveDisabled(false);
    }
  }

  const disapproveAccount = async (account_id) => {
    setDisapproveLoading(true);
    setDisapproveDisabled(true);
    setApproveDisabled(true);

    const res = await fetch(`/api/Users?id=${account_id}`, {
      method: 'DELETE',
    })
    const decRes = await res.json();

    if (res.ok) {
      toast.success(decRes.message, { duration: 6000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
      setDisapproveLoading(false);
      setDisapproveDisabled(false);
      setApproveDisabled(false);
      getUsers();
    } else {
      toast.error(decRes.message, { duration: 6000, style: { background: '#f97316', color: '#fff', border: '1px solid #000', padding: '20px' } });
      setDisapproveLoading(false);
      setDisapproveDisabled(false);
      setApproveDisabled(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, [])

  let accountListDisplay;

  if (accountList.length > 0) {
    accountListDisplay =
      accountList.map(account => (
        !account.isCreatorAdmin ?
          <AccountCard key={account._id} accountKey={account._id} fullname={account.fullname} email={account.email} office={account.office} role={account.role} staffID={account.staffID} isApproved={account.isApproved} approveAccount={approveAccount} disapproveAccount={disapproveAccount} approveLoading={approveLoading} disapproveLoading={disapproveLoading} approveDisabled={approveDisabled} disapproveDisabled={disapproveDisabled} /> : ''
      ))
  } else {
    accountListDisplay = <p>There are currently no memos</p>
  }

  return (
    <>
      {isLoading
        ?
        <>
          <div className="bg-gray-200 h-40 animate-pulse rounded mb-4"></div>
          <div className="bg-gray-200 h-40 animate-pulse rounded mb-4"></div>
          <div className="bg-gray-200 h-40 animate-pulse rounded"></div>
        </>
        : accountListDisplay}
    </>
  )
}

export default AccountListComponent