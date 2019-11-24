
export class Reimbursement {
    reimbursementId: number;
    author: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number;
    amount: number;
    constructor(reimbursementId: number, author: number, dateSubmitted: number, dateResolved: number, description: string, resolver: number, status: number, type: number, amount: number) {
        this.reimbursementId = reimbursementId;
        this.author = author;
        this.dateSubmitted = dateSubmitted;
        this.dateResolved = dateResolved;
        this.description = description;
        this.resolver = resolver;
        this.status = status;
        this.type = type;
        this.amount = amount;
    }
}