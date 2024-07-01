import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import TransactionForm from "@/components/TransactionForm";
import { v4 as uuidv4 } from "uuid";

const placeholderTransactions = [
  { id: uuidv4(), date: new Date(), amount: 100, type: "Income", category: "Nike" },
  { id: uuidv4(), date: new Date(), amount: 200, type: "Expense", category: "Adidas" },
];

const Transactions = () => {
  const [transactions, setTransactions] = useState(placeholderTransactions);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleAddTransaction = (transaction) => {
    setTransactions([...transactions, { ...transaction, id: uuidv4() }]);
  };

  const handleEditTransaction = (updatedTransaction) => {
    setTransactions(transactions.map((transaction) =>
      transaction.id === updatedTransaction.id ? updatedTransaction : transaction
    ));
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    setTransactions(transactions.filter((transaction) => transaction.id !== id));
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Transactions</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Transaction</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm onSubmit={handleAddTransaction} />
          </DialogContent>
        </Dialog>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction) => (
            <TableRow key={transaction.id}>
              <TableCell>{format(new Date(transaction.date), "yyyy-MM-dd")}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell>{transaction.category}</TableCell>
              <TableCell>
                <Button variant="outline" size="sm" onClick={() => setEditingTransaction(transaction)}>Edit</Button>
                <Button variant="destructive" size="sm" onClick={() => handleDeleteTransaction(transaction.id)}>Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {editingTransaction && (
        <Dialog open={true} onOpenChange={() => setEditingTransaction(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Transaction</DialogTitle>
            </DialogHeader>
            <TransactionForm transaction={editingTransaction} onSubmit={handleEditTransaction} />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Transactions;