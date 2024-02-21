/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package fibonacci;

/**
 *
 * @author Anderson
 */
public class Fibonacci {

    /**
     * @param args the command line arguments
     */
   public static void main(String[] args) {
        int n = 10; // Puedes cambiar el valor de 'n' según tus necesidades
        System.out.println("Serie de Fibonacci hasta " + n + " términos:");
        
        for (int i = 0; i < n; i++) {
            System.out.print(calcularFibonacci(i) + " ");
        }
    }

    public static int calcularFibonacci(int n) {
        if (n <= 1) {
            return n;
        } else {
            return calcularFibonacci(n - 1) + calcularFibonacci(n - 2);
        }
    }
    
}
