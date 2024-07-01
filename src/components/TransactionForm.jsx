import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

const TransactionForm = ({ transaction, onSubmit }) => {
  const [date, setDate] = useState(transaction ? new Date(transaction.date) : new Date());
  const [amount, setAmount] = useState(transaction ? transaction.amount : "");
  const [type, setType] = useState(transaction ? transaction.type : "Income");
  const [category, setCategory] = useState(transaction ? transaction.category : "Nike");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ id: transaction?.id, date, amount, type, category });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="date">Date</Label>
        <Calendar selected={date} onSelect={setDate} />
      </div>
      <div>
        <Label htmlFor="amount">Amount</Label>
        <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="type">Type</Label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger>
            <SelectValue placeholder="Select type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Income">Income</SelectItem>
            <SelectItem value="Expense">Expense</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="category">Category</Label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger>
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Nike">Nike</SelectItem>
            <SelectItem value="Adidas">Adidas</SelectItem>
            <SelectItem value="Puma">Puma</SelectItem>
            <SelectItem value="Reebok">Reebok</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button type="submit">{transaction ? "Update" : "Add"} Transaction</Button>
    </form>
  );
};

export default TransactionForm;