export interface Ticket{
  id: string,
  title: string;
  request: string;
  status: TicketStatus; //'open' | 'close';
}

export const TICKET_STATUS = {
  open: 'open',
  close: 'close'
} as const;

export type TicketStatus = typeof TICKET_STATUS[keyof typeof TICKET_STATUS];

export const TICKET_STATUS_LIST: TicketStatus[] = Object.values(TICKET_STATUS);