// @ts-nocheck
"use client";
import { useState } from "react";
import styles from "./page.module.css";
import UserForm from "./components/UserForm";
import UserList from "./components/UserList";

export default function Home() {
  const [view, setView] = useState('form');

  return (
    <div className={styles.page}>
      <button 
        className={styles.viewToggle}
        onClick={() => setView(view === 'form' ? 'list' : 'form')}
      >
        {view === 'form' ? 'View Submitted Users' : 'Back to Form'}
      </button>
      <main className={styles.main}>
        {view === 'form' ? <UserForm /> : <UserList />}
      </main>
    </div>
  );
}
