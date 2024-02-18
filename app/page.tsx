import Image from "next/image";
import styles from "./page.module.css";
import { getOne } from "@/lib/actions";


export default async function Home() {
 
  return (
    
   <button onClick={getOne}>Getting started</button>
  )
}
