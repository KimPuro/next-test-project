'use client'

import { useRouter } from "next/navigation"
import { DataGrid, GridRowSelectionModel } from '@mui/x-data-grid';
import { useState, useEffect } from "react"
import { Box, Button } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux'
import { NextPage } from "next";
import { findAllArticles } from "@/app/components/article/service/article-service";
import { getAllArticles } from "@/app/components/article/service/article-slice";
import Columns from "@/app/components/article/module/columns";
import axios from "axios";

const ArticleListPage: NextPage = () => {
    const dispatch = useDispatch();
    const allArticles: [] = useSelector(getAllArticles);
    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);

    const handleDelete = async () => {
        await Promise.all(selectedRows.map(id => axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/articles/delete/${id}`)));
        dispatch(findAllArticles(1));
    };

    useEffect(() => {
        dispatch(findAllArticles(1));
    }, [dispatch]);

    return (
        <>
            <h2>게시글 목록</h2>
            <span className="text-3xl justify-center flex">게시글 수 : {allArticles.length}</span>
            <br/>
            <Button onClick={handleDelete}>삭제</Button>
            <Box sx={{ height: '100%', width: '100%' }}>
                {allArticles && <DataGrid
                    rows={allArticles}
                    columns={Columns()}
                    onRowSelectionModelChange={(newSelection) => {
                        setSelectedRows(newSelection);
                    }}
                    pageSizeOptions={[5,10,20]}
                    checkboxSelection
                />}
            </Box>
        </>
    );
};

export default ArticleListPage;
