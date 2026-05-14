// Practice problems — graduated difficulty, with hints and full solutions.
// Hidden behind <details> so you struggle first.
window.PROBLEMS = [
  {
    id: "p-001",
    title: "Sum two numbers",
    difficulty: "easy",
    module: "Foundations",
    statement: "Read two integers from the user and print their sum.",
    hint: "Use scanf twice with %d, then printf the sum.",
    solution:
`#include <stdio.h>
int main(void) {
    int a, b;
    printf("Enter two numbers: ");
    scanf("%d %d", &a, &b);
    printf("Sum = %d\\n", a + b);
    return 0;
}`
  },
  {
    id: "p-002",
    title: "Even or odd",
    difficulty: "easy",
    module: "Control flow",
    statement: "Read an integer. Print 'Even' if divisible by 2, else 'Odd'.",
    hint: "Use the modulo operator: n % 2 == 0 means even.",
    solution:
`#include <stdio.h>
int main(void) {
    int n;
    scanf("%d", &n);
    if (n % 2 == 0) printf("Even\\n"); else printf("Odd\\n");
    return 0;
}`
  },
  {
    id: "p-003",
    title: "VAT calculator",
    difficulty: "easy",
    module: "Foundations",
    statement: "Read an amount in UGX. Print the VAT (18%) and the amount after VAT is removed.",
    hint: "VAT = amount * 0.18; net = amount - VAT.",
    solution:
`#include <stdio.h>
int main(void) {
    double amount, vat, net;
    printf("Amount paid (UGX): ");
    scanf("%lf", &amount);
    vat = amount * 0.18;
    net = amount - vat;
    printf("VAT: %.2f, After VAT: %.2f\\n", vat, net);
    return 0;
}`
  },
  {
    id: "p-004",
    title: "Grade classifier",
    difficulty: "easy",
    module: "Control flow",
    statement: "Read a score 0..100. Print: A (>=80), B (>=70), C (>=60), D (>=50), F otherwise.",
    hint: "Chain if/else if. Order matters — start from the highest threshold.",
    solution:
`#include <stdio.h>
int main(void) {
    int s;
    scanf("%d", &s);
    if      (s >= 80) printf("A\\n");
    else if (s >= 70) printf("B\\n");
    else if (s >= 60) printf("C\\n");
    else if (s >= 50) printf("D\\n");
    else              printf("F\\n");
    return 0;
}`
  },
  {
    id: "p-005",
    title: "Sum 1..N with a loop",
    difficulty: "easy",
    module: "Loops",
    statement: "Read N. Print 1+2+...+N.",
    hint: "for (int i=1; i<=n; i++) total += i;",
    solution:
`#include <stdio.h>
int main(void) {
    int n, total = 0;
    scanf("%d", &n);
    for (int i = 1; i <= n; i++) total += i;
    printf("Sum = %d\\n", total);
    return 0;
}`
  },
  {
    id: "p-006",
    title: "Multiplication table",
    difficulty: "easy",
    module: "Loops",
    statement: "Read N. Print N's times-table from 1 to 12 in the form 'N x i = result'.",
    hint: "Single for loop.",
    solution:
`#include <stdio.h>
int main(void) {
    int n;
    scanf("%d", &n);
    for (int i = 1; i <= 12; i++)
        printf("%d x %d = %d\\n", n, i, n * i);
    return 0;
}`
  },
  {
    id: "p-007",
    title: "Largest of three",
    difficulty: "easy",
    module: "Control flow",
    statement: "Read three numbers. Print the largest.",
    hint: "Compare with if/else, or use a 'max so far' variable.",
    solution:
`#include <stdio.h>
int main(void) {
    int a, b, c, max;
    scanf("%d %d %d", &a, &b, &c);
    max = a;
    if (b > max) max = b;
    if (c > max) max = c;
    printf("Largest: %d\\n", max);
    return 0;
}`
  },
  {
    id: "p-008",
    title: "Reverse a number",
    difficulty: "medium",
    module: "Loops",
    statement: "Read a positive integer and print it reversed (e.g., 1234 -> 4321).",
    hint: "Repeat: take n%10 (last digit), build it into the answer with answer = answer*10 + digit, then n /= 10.",
    solution:
`#include <stdio.h>
int main(void) {
    int n, rev = 0;
    scanf("%d", &n);
    while (n > 0) {
        rev = rev * 10 + n % 10;
        n /= 10;
    }
    printf("%d\\n", rev);
    return 0;
}`
  },
  {
    id: "p-009",
    title: "Count digits",
    difficulty: "easy",
    module: "Loops",
    statement: "Read an integer and count how many digits it has.",
    hint: "Loop while n > 0, divide by 10, count.",
    solution:
`#include <stdio.h>
int main(void) {
    int n, count = 0;
    scanf("%d", &n);
    if (n == 0) { printf("1\\n"); return 0; }
    while (n > 0) { count++; n /= 10; }
    printf("%d\\n", count);
    return 0;
}`
  },
  {
    id: "p-010",
    title: "Factorial",
    difficulty: "medium",
    module: "Loops / Functions",
    statement: "Write a function int factorial(int n) and use it in main.",
    hint: "for (int i=1; i<=n; i++) result *= i;",
    solution:
`#include <stdio.h>
int factorial(int n) {
    int r = 1;
    for (int i = 2; i <= n; i++) r *= i;
    return r;
}
int main(void) {
    int n;
    scanf("%d", &n);
    printf("%d! = %d\\n", n, factorial(n));
    return 0;
}`
  },
  {
    id: "p-011",
    title: "Average of an array",
    difficulty: "easy",
    module: "Arrays",
    statement: "Read N then N integers into an array. Print the average.",
    hint: "Sum in a loop, divide by N. Cast to double for the division.",
    solution:
`#include <stdio.h>
int main(void) {
    int n;
    scanf("%d", &n);
    int a[100];
    int sum = 0;
    for (int i = 0; i < n; i++) { scanf("%d", &a[i]); sum += a[i]; }
    printf("Average: %.2f\\n", (double)sum / n);
    return 0;
}`
  },
  {
    id: "p-012",
    title: "Find max in array",
    difficulty: "medium",
    module: "Arrays",
    statement: "Read N integers into an array, then print the max.",
    hint: "Initialise max = a[0], then loop comparing.",
    solution:
`#include <stdio.h>
int main(void) {
    int n;
    scanf("%d", &n);
    int a[100];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    int max = a[0];
    for (int i = 1; i < n; i++) if (a[i] > max) max = a[i];
    printf("Max: %d\\n", max);
    return 0;
}`
  },
  {
    id: "p-013",
    title: "String length without strlen",
    difficulty: "medium",
    module: "Strings",
    statement: "Write a function int my_strlen(const char *s) that returns the length, without using strlen.",
    hint: "Loop until you hit '\\0'.",
    solution:
`#include <stdio.h>
int my_strlen(const char *s) {
    int n = 0;
    while (s[n] != '\\0') n++;
    return n;
}
int main(void) {
    char buf[100];
    scanf("%99s", buf);
    printf("Length = %d\\n", my_strlen(buf));
    return 0;
}`
  },
  {
    id: "p-014",
    title: "Reverse a string in place",
    difficulty: "medium",
    module: "Strings / Pointers",
    statement: "Reverse a string in place using two indices (start and end).",
    hint: "Swap s[i] with s[len-1-i] for i < len/2.",
    solution:
`#include <stdio.h>
#include <string.h>
void reverse(char *s) {
    int n = strlen(s);
    for (int i = 0; i < n/2; i++) {
        char t = s[i];
        s[i] = s[n-1-i];
        s[n-1-i] = t;
    }
}
int main(void) {
    char buf[100];
    scanf("%99s", buf);
    reverse(buf);
    printf("%s\\n", buf);
    return 0;
}`
  },
  {
    id: "p-015",
    title: "Swap two variables via pointers",
    difficulty: "medium",
    module: "Pointers",
    statement: "Write void swap(int *a, int *b) that swaps the values of the two variables it points to.",
    hint: "Use a temp local variable.",
    solution:
`#include <stdio.h>
void swap(int *a, int *b) {
    int t = *a;
    *a = *b;
    *b = t;
}
int main(void) {
    int x = 5, y = 9;
    swap(&x, &y);
    printf("x=%d, y=%d\\n", x, y);   // x=9, y=5
    return 0;
}`
  },
  {
    id: "p-016",
    title: "Struct: Book record",
    difficulty: "medium",
    module: "Structs",
    statement: "Define a struct Book { title[50], author[50], year, price }. Read one and print it.",
    hint: "Use fgets for spaces, scanf for numbers; consume any leftover newline with getchar() between scanfs.",
    solution:
`#include <stdio.h>
#include <string.h>
typedef struct {
    char title[50];
    char author[50];
    int year;
    double price;
} Book;

int main(void) {
    Book b;
    printf("Title: ");  fgets(b.title, sizeof(b.title), stdin);  b.title[strcspn(b.title, "\\n")] = 0;
    printf("Author: "); fgets(b.author, sizeof(b.author), stdin); b.author[strcspn(b.author, "\\n")] = 0;
    printf("Year: ");   scanf("%d", &b.year);
    printf("Price: ");  scanf("%lf", &b.price);
    printf("\\n%s by %s (%d) - %.2f\\n", b.title, b.author, b.year, b.price);
    return 0;
}`
  },
  {
    id: "p-017",
    title: "Function modifying a struct",
    difficulty: "medium",
    module: "Structs / Pointers",
    statement: "Define struct Account { balance }. Write deposit(Account *a, double amount). Test it.",
    hint: "Use the arrow operator a->balance += amount.",
    solution:
`#include <stdio.h>
typedef struct { double balance; } Account;

void deposit(Account *a, double amount) { a->balance += amount; }

int main(void) {
    Account acc = {0};
    deposit(&acc, 100.0);
    deposit(&acc, 50.0);
    printf("Balance: %.2f\\n", acc.balance);  // 150.00
    return 0;
}`
  },
  {
    id: "p-018",
    title: "Menu loop skeleton",
    difficulty: "medium",
    module: "Control flow",
    statement: "Write a do-while + switch menu with options: 1) say hi, 2) print PI, 0) exit.",
    hint: "do { print menu; scanf; switch; } while (choice != 0);",
    solution:
`#include <stdio.h>
int main(void) {
    int choice;
    do {
        printf("\\n1) Hi\\n2) PI\\n0) Exit\\n> ");
        scanf("%d", &choice);
        switch (choice) {
            case 1: printf("Hi!\\n"); break;
            case 2: printf("3.14159\\n"); break;
            case 0: printf("Bye\\n"); break;
            default: printf("Invalid\\n");
        }
    } while (choice != 0);
    return 0;
}`
  },
  {
    id: "p-019",
    title: "Prime check",
    difficulty: "medium",
    module: "Loops",
    statement: "Read N. Print 'Prime' or 'Not prime'.",
    hint: "Loop i from 2 to sqrt(n) (or n/2). If any divides, not prime.",
    solution:
`#include <stdio.h>
int main(void) {
    int n;
    scanf("%d", &n);
    if (n < 2) { printf("Not prime\\n"); return 0; }
    int prime = 1;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) { prime = 0; break; }
    }
    printf(prime ? "Prime\\n" : "Not prime\\n");
    return 0;
}`
  },
  {
    id: "p-020",
    title: "Fibonacci sequence",
    difficulty: "medium",
    module: "Loops",
    statement: "Read N. Print the first N Fibonacci numbers.",
    hint: "Track two previous: a=0, b=1; loop: print a, then (a,b)=(b,a+b).",
    solution:
`#include <stdio.h>
int main(void) {
    int n;
    scanf("%d", &n);
    long a = 0, b = 1;
    for (int i = 0; i < n; i++) {
        printf("%ld ", a);
        long t = a + b; a = b; b = t;
    }
    printf("\\n");
    return 0;
}`
  },
  {
    id: "p-021",
    title: "Palindrome check (string)",
    difficulty: "hard",
    module: "Strings / Pointers",
    statement: "Read a word. Print 'Palindrome' if it reads the same backwards, else 'No'.",
    hint: "Two indices i, j moving toward each other. Stop if any pair differs.",
    solution:
`#include <stdio.h>
#include <string.h>
int main(void) {
    char s[100];
    scanf("%99s", s);
    int i = 0, j = strlen(s) - 1, ok = 1;
    while (i < j) {
        if (s[i] != s[j]) { ok = 0; break; }
        i++; j--;
    }
    printf(ok ? "Palindrome\\n" : "No\\n");
    return 0;
}`
  },
  {
    id: "p-022",
    title: "Bubble sort",
    difficulty: "hard",
    module: "Arrays",
    statement: "Read N integers. Sort them ascending using bubble sort. Print sorted.",
    hint: "Outer loop n-1 times. Inner loop swaps adjacent out-of-order pairs.",
    solution:
`#include <stdio.h>
int main(void) {
    int n;
    scanf("%d", &n);
    int a[100];
    for (int i = 0; i < n; i++) scanf("%d", &a[i]);
    for (int i = 0; i < n - 1; i++)
        for (int j = 0; j < n - 1 - i; j++)
            if (a[j] > a[j+1]) {
                int t = a[j]; a[j] = a[j+1]; a[j+1] = t;
            }
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    return 0;
}`
  },
  {
    id: "p-023",
    title: "Word frequency in a sentence",
    difficulty: "hard",
    module: "Strings",
    statement: "Read a sentence (with spaces). Count and print how many words it has.",
    hint: "Use fgets. Walk char by char; a new word starts at each non-space following a space (or at index 0).",
    solution:
`#include <stdio.h>
#include <string.h>
#include <ctype.h>
int main(void) {
    char s[200];
    fgets(s, sizeof(s), stdin);
    int count = 0, in_word = 0;
    for (int i = 0; s[i]; i++) {
        if (isspace((unsigned char)s[i])) in_word = 0;
        else if (!in_word) { in_word = 1; count++; }
    }
    printf("Words: %d\\n", count);
    return 0;
}`
  },
  {
    id: "p-024",
    title: "Dynamic array of ints",
    difficulty: "hard",
    module: "Dynamic memory",
    statement: "Read N at runtime, malloc an int array of size N, fill with i*i, print, then free.",
    hint: "malloc(n * sizeof(int)). Don't forget free.",
    solution:
`#include <stdio.h>
#include <stdlib.h>
int main(void) {
    int n;
    scanf("%d", &n);
    int *a = malloc(n * sizeof(int));
    if (!a) return 1;
    for (int i = 0; i < n; i++) a[i] = i * i;
    for (int i = 0; i < n; i++) printf("%d ", a[i]);
    printf("\\n");
    free(a);
    return 0;
}`
  },
  {
    id: "p-025",
    title: "Read until EOF and sum",
    difficulty: "hard",
    module: "I/O",
    statement: "Read integers from stdin until EOF. Print their sum.",
    hint: "while (scanf(\"%d\", &x) == 1) sum += x;",
    solution:
`#include <stdio.h>
int main(void) {
    int x, sum = 0;
    while (scanf("%d", &x) == 1) sum += x;
    printf("Sum = %d\\n", sum);
    return 0;
}`
  }
];
