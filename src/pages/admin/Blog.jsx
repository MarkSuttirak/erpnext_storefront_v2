import React from "react";
import { useEffect } from "react";
import Dashboard from "./component/dashboard";
import TableComponent from "./component/tab";
import { Button } from "@/components/ui/button"



const Blog = () => {

    return (
        <>
            <dev class="grid-container">
            <div class="dashboard" ><Dashboard></Dashboard></div>
            <div class="table" >  <TableComponent></TableComponent></div>
            <div class="edit-button"><Button variant="outline">Button</Button></div>

            </dev>
        </>
        
    )
}

export default Blog