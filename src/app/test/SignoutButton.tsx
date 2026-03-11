"use client";
import {Button} from "@/src/components/ui/Button";
import {signOut} from "@/src/features/auth/actions/auth.actions";
import React from "react";

const SignoutButton = () => {
  return <Button onClick={signOut}>Signout</Button>;
};

export default SignoutButton;
