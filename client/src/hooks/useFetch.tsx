import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../contexts/AuthContext";

const useFetch = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { setUser } = useContext(AuthContext);

  useEffect(() => {
    console.log("DATAA", data);
  }, [data]);

  async function getApi(url: string) {
    try {
      setLoading(true);

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Login Err");
      }

      const result = await response.json();

      setData(result.user);

      setUser(result.user);

      toast(result.message);
    } catch (error) {
      setError(error);
      console.log("Error Get API:", error);
      toast("Error Get User Data");
    } finally {
      setLoading(false);
    }
  }

  return { data, loading, error, getApi };
};

export default useFetch;
