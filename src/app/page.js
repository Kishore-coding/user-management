import Image from "next/image";
import styles from "./page.module.css";
import UserTable from "./components/UserTable/UserTable";
// import TableHeader from "./components/TableHeader/TableHeader";

export default function Home() {
  return (
    <main>
      {/* <TableHeader /> */}
      <UserTable />
    </main>
  );
}
