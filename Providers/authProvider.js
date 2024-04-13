import React, { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@lib/supabase";
export const authContext = createContext({});
console.log(authContext, "dey");
export default function AuthProvider({ children }) {
  const [sessions, setSessions] = useState();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const getSession = async () => {
      const result = await supabase.auth.getSession();
      const { session } = result.data;
      setSessions(session);
      if (session) {
        // fetch profile
        const { data } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", session.user.id)
          .single();
        setProfile(data || null);
      }
      setLoading(false);
    };

    getSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSessions(session);
    });
  }, []);

  return (
    <authContext.Provider
      value={{ sessions, loading, profile, isAdmin: profile?.group == "ADMIN" }}
    >
      {children}
    </authContext.Provider>
  );
}
export const useAuth = () => {
  return useContext(authContext);
};
