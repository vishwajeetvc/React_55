export default function ShowBlogs() {
  return (
    <>
      <div className="p-4 flex  max-w-[850px] flex-wrap gap-3 justify-center">
        {blogs.map(({ title, author, content, id }) => (
          <div
            key={id}
            className=" w-[400px] cursor-pointer hover:shadow shadow-cyan-500 p-4 border-gray-600 border-5 border"
          >
            <h2 className="text-xl mb-3 font-bold text-gray-300">{title}</h2>
            <p className="my-1 font-bold text-orange-400"># {author}</p>
            <p className=" text-gray-300">{content.slice(0, 110)}...ReadMore</p>
          </div>
        ))}
      </div>
    </>
  );
}

const blogs = [
  {
    id: 1,
    title: "Getting Started with Databases in C: A Beginner's Guide",
    author: "John Doe",
    date: "2025-03-03",
    tags: ["C Programming", "Databases", "SQLite"],
    content:
      "Connecting a C program to a database can seem complex at first, but with the right approach, it becomes manageable. This guide introduces how to use SQLite with C, from setting up the library to executing basic queries. We'll cover the steps to install SQLite, connect to a database, and run simple SQL commands. By the end, you'll be able to create, read, update, and delete records from your C applications.",
  },
  {
    id: 2,
    title: "Performing CRUD Operations in C with MySQL",
    author: "Jane Smith",
    date: "2025-03-03",
    tags: ["C Programming", "MySQL", "CRUD"],
    content:
      "CRUD (Create, Read, Update, Delete) operations are essential for managing data in databases. This blog explains how to perform these operations using the MySQL C API. We'll demonstrate how to set up a connection, prepare SQL statements, and execute queries safely using prepared statements to avoid SQL injection vulnerabilities.",
  },
  {
    id: 3,
    title: "Building a Simple Address Book Application with SQLite in C",
    author: "Mike Brown",
    date: "2025-03-03",
    tags: ["C Programming", "SQLite", "Project"],
    content:
      "This project-based tutorial shows how to create a simple address book application using SQLite with C. We'll guide you through setting up the database, creating tables, and implementing functions to add, view, update, and delete contacts. The project emphasizes practical database usage in real-world C applications.",
  },
  {
    id: 4,
    title: "Preventing SQL Injection in C with Prepared Statements",
    author: "Emily White",
    date: "2025-03-03",
    tags: ["C Programming", "Security", "SQL Injection"],
    content:
      "SQL injection is a critical security threat for database applications. In this blog, we explain how to use prepared statements in C to mitigate this risk. Using practical examples, we'll show how binding parameters and executing queries securely can keep your application safe from malicious SQL inputs.",
  },
  {
    id: 5,
    title: "Using Transactions in C to Ensure Database Consistency",
    author: "David Green",
    date: "2025-03-03",
    tags: ["C Programming", "Transactions", "Databases"],
    content:
      "Database transactions help maintain data integrity, especially during complex operations. In this post, we'll cover how to use transactions in C with popular databases like SQLite and MySQL. We'll discuss starting transactions, committing changes, and handling rollbacks to maintain a consistent state even if errors occur.",
  },
  {
    id: 6,
    title: "Using Transactions in C to Ensure Database Consistency",
    author: "David Green",
    date: "2025-03-03",
    tags: ["C Programming", "Transactions", "Databases"],
    content:
      "Database transactions help maintain data integrity, especially during complex operations. In this post, we'll cover how to use transactions in C with popular databases like SQLite and MySQL. We'll discuss starting transactions, committing changes, and handling rollbacks to maintain a consistent state even if errors occur.",
  },
];

