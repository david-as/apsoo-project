package br.ufrpe.dc.qualiti.banking.model.transaction;

public class NotEnoughBalanceException extends Exception {
    public NotEnoughBalanceException() {
        super("Not enough balance");
    }
}
