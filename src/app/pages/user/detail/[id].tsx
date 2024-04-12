'use client'

import { useRouter } from "next/navigation"
import { DataGrid } from '@mui/x-data-grid';
import { useState, useEffect } from "react"
import {Box, Button, Input, Typography} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from "next";
import { findAllBoards } from "@/app/components/board/service/board-service";
import { getAllBoards } from "@/app/components/board/service/board-slice";
import Columns from "@/app/components/board/module/columns";

export default function UserDetial({param}:any){
    const dispatch = useDispatch()
    const user:IUser = useSelector(getUserById)
    useEffect(() => {
        dispatch(findUserById(param.id))
    }, []);
    return <>
    </>
}