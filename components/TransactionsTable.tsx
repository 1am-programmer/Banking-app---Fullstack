import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  return (
    <div className={cn("category-badge")}>
      <div className={cn("size-2 rounded-full")} />
      <p className={cn("text-[12px] font-medium")}>{category}</p>
    </div>
  );
};

const TransactionsTable = ({ transactions }: TransactionTableProps) => {
  return (
    <div>
      <Table>
        <TableHeader className="bg-[#f9fafb]">
          <TableRow>
            <TableHead className="px-2">Transactions</TableHead>
            <TableHead className="px-2">Amount</TableHead>
            <TableHead className="px-2">Status</TableHead>
            <TableHead className="px-2">Date</TableHead>
            <TableHead className="px-2  max-md:hidden">Channel</TableHead>
            <TableHead className="px-2 max-md:hidden ">Category</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map((transaction: Transaction) => {
            const status = getTransactionStatus(new Date(transaction.date));
            const amount = formatAmount(transaction.amount);

            const isDebit = transaction.type === "debit";
            const isCredit = transaction.type === "credit";

            return (
              <TableRow
                key={transaction.id}
                className={`${
                  isDebit || amount[0] === "-" ? "bg-[#fffbfa]" : "bg-[#f6fef9]"
                } !over:bg-none !border-b-default `}
              >
                {/* Can be  250px */}
                <TableCell className="max-w-[200px] pl-2 pr-10">
                  <div className="flex items-center gap-3">
                    <h1 className=" text-14  truncate font-semibold text-[#344054]">
                      {removeSpecialCharacters(transaction.name)}
                    </h1>
                  </div>
                </TableCell>

                <TableCell
                  className={`pr-2  pl-10  font-semibold
                     ${
                       isDebit || amount[0] === "-"
                         ? "text-[#f04438]"
                         : "text-[#039855]"
                     }
                  `}
                >
                  {isDebit ? `-${amount}` : isCredit ? amount : amount}
                </TableCell>

                <TableCell className=" pl-2 pr-10">
                  <CategoryBadge category={status} />
                </TableCell>

                <TableCell className="min-w-32 pl-2 pr-10">
                  {formatDateTime(new Date(transaction.date)).dateTime}
                </TableCell>

                <TableCell className=" pl-2 pr-10 capitalize min-w-24">
                  {transaction.paymentChannel}
                </TableCell>

                <TableCell className=" pl-2 pr-10 max-md:hidden">
                  <CategoryBadge category={transaction.category} />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};
export default TransactionsTable;