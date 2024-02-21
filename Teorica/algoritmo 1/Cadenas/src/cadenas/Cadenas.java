/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package cadenas;

import java.util.Scanner;
import java.util.Stack;

/**
 *
 * @author Anderson
 */
public class Cadenas {

    /**
     * @param args the command line arguments
     */
     public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese una frase:");
        String frase = scanner.nextLine();

        boolean balanceado = verificarBalanceo(frase);
        
        System.out.println("La frase está balanceada: " + balanceado);
    }

    public static boolean verificarBalanceo(String frase) {
        Stack<Character> pila = new Stack<>();

        for (char caracter : frase.toCharArray()) {
            if (esApertura(caracter)) {
                pila.push(caracter);
            } else if (esCierre(caracter)) {
                if (pila.isEmpty() || !corresponden(pila.pop(), caracter)) {
                    return false;
                }
            }
        }

        return pila.isEmpty();
    }

    private static boolean esApertura(char caracter) {
        return caracter == '(' || caracter == '[' || caracter == '{';
    }

    private static boolean esCierre(char caracter) {
        return caracter == ')' || caracter == ']' || caracter == '}';
    }

    private static boolean corresponden(char apertura, char cierre) {
        return (apertura == '(' && cierre == ')') ||
               (apertura == '[' && cierre == ']') ||
               (apertura == '{' && cierre == '}');
    }
    
}
