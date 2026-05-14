// Lessons — written to teach mental models, not just syntax.
// Each lesson has: id, title, subtitle, blocks (rich content), and optional starter code.
// Block types: p (paragraph), h2, h3, code, callout, list, ol, checklist
window.LESSONS = [
  /* ============================================================
     MODULE 0 — MINDSET & METHODOLOGY (the real reason most fail)
     ============================================================ */
  {
    id: "mindset-1",
    title: "Why You Failed (and Exactly How to Fix It)",
    subtitle: "A diagnosis before any code.",
    blocks: [
      { type: "p", text: "If you flunked a C test on something like the Prepaid Meter Simulator, the problem is almost never C syntax. It's that you sat down, read the question, and your brain didn't have a <b>method</b> to break the problem into pieces a computer can execute. You stared at it. The clock ticked. You panicked." },
      { type: "p", text: "Pros do not solve a meter simulator by being clever. They solve it by following a routine that turns any English description into code. That routine is what most courses skip. This app teaches it." },

      { type: "h2", text: "The 5-step routine pros use" },
      { type: "ol", items: [
        "<b>Restate the problem in your own words.</b> Out loud or on paper. If you can't, you don't understand it yet.",
        "<b>Identify the data.</b> What information must your program remember? Group related data into <code>struct</code>s. This becomes your data model.",
        "<b>List the actions.</b> What must the program <i>do</i>? Each action becomes a function. Name them as verbs: <code>register_customer</code>, <code>buy_units</code>.",
        "<b>Pick the control flow.</b> A menu loop? One-shot run? Then map actions to menu options or call sites.",
        "<b>Write the smallest piece that can run.</b> Print 'Hello'. Compile. Then add ONE thing. Compile. Then ONE more. Never write 100 lines without compiling.",
      ]},

      { type: "callout", style: "tip", title: "The single habit that changes everything",
        text: "Compile after every 5–15 lines. Beginners write 200 lines, hit Run, get 40 errors, and shut down. Pros never let more than a handful of new lines accumulate before they prove it works." },

      { type: "h2", text: "How to use this app" },
      { type: "ol", items: [
        "Work the modules in order. Don't skip Pointers — it is THE topic where most people break.",
        "After every lesson, do the practice problems. Don't peek at solutions until you've struggled for 10+ minutes.",
        "When you reach <b>Projects</b>, build the Prepaid Meter Simulator stage by stage. By the end, it will feel obvious.",
        "Open the Playground (top right) any time to write and run code. You don't need to install anything."
      ]},
      { type: "p", text: "Mark a lesson done when you can <i>explain it back to yourself without looking</i>. Not when you finished reading it." }
    ]
  },

  {
    id: "mindset-2",
    title: "Decomposing a Problem Like a Pro",
    subtitle: "Live demo on the meter question.",
    blocks: [
      { type: "p", text: "Let's apply the 5-step routine to the exact problem you saw on the test, before you know any C. The point is that decomposition happens BEFORE coding." },

      { type: "h2", text: "Step 1 — Restate" },
      { type: "p", text: "<i>'Build a program where a customer can register, buy units with a token, see units deducted by VAT and a service fee, simulate using power, and view their balance and details — through a menu.'</i>" },

      { type: "h2", text: "Step 2 — The data" },
      { type: "p", text: "What must we remember about the customer between actions? Re-read the requirements list. Each bullet is a field:" },
      { type: "code", lang: "c", code:
`typedef struct {
    char name[50];
    char meter_number[20];
    char type[15];          // "Domestic" or "Commercial"
    char token[20];
    double current_units;
    double amount_paid;
    double vat_charged;
    double service_fee;
} Customer;` },
      { type: "p", text: "That single struct IS the data model for the entire program. Notice we named it after the real-world thing it represents." },

      { type: "h2", text: "Step 3 — The actions (each becomes a function)" },
      { type: "list", items: [
        "<code>register_customer(Customer *c)</code> — fill the struct from user input.",
        "<code>buy_units(Customer *c)</code> — read amount, deduct VAT + fee, add units.",
        "<code>simulate_usage(Customer *c)</code> — read units used, subtract from balance.",
        "<code>show_balance(Customer *c)</code> — print remaining units.",
        "<code>show_details(Customer *c)</code> — print everything.",
        "<code>main()</code> — show the menu in a loop and dispatch with <code>switch</code>."
      ]},

      { type: "h2", text: "Step 4 — Control flow" },
      { type: "p", text: "A <code>do { menu; switch; } while (choice != 0);</code> loop. Standard for menu-driven CLI apps." },

      { type: "h2", text: "Step 5 — Smallest first" },
      { type: "p", text: "Write <code>main</code> with a menu that just prints the chosen option number. Compile. Then implement <code>register_customer</code> only. Compile. Test by registering and seeing details. THEN add <code>buy_units</code>. And so on." },

      { type: "callout", style: "tip", title: "You just designed the whole program",
        text: "We haven't typed a single complete C program — but the entire architecture is decided. The rest is just translating these decisions into syntax. THAT is the skill. The lessons that follow give you the syntax." }
    ]
  },

  /* ============================================================
     MODULE 1 — FOUNDATIONS
     ============================================================ */
  {
    id: "found-1",
    title: "Your First Program — and What Every Line Means",
    subtitle: "We dissect Hello, World line by line.",
    blocks: [
      { type: "code", lang: "c", code:
`#include <stdio.h>

int main(void) {
    printf("Hello, World!\\n");
    return 0;
}` },
      { type: "h2", text: "Line by line, no hand-waving" },
      { type: "list", items: [
        "<code>#include &lt;stdio.h&gt;</code> — a <b>preprocessor directive</b>. Before compilation, the contents of <code>stdio.h</code> (declarations for input/output functions like <code>printf</code>) are pasted in. Without it, the compiler doesn't know what <code>printf</code> is.",
        "<code>int main(void)</code> — every C program starts here. <code>int</code> means it returns an integer to the operating system. <code>void</code> means it takes no arguments.",
        "<code>{ ... }</code> — curly braces define a <b>block</b>. The body of <code>main</code> lives inside.",
        "<code>printf(\"Hello, World!\\n\");</code> — a function call. <code>\\n</code> is a newline escape. Every statement ends with <code>;</code>.",
        "<code>return 0;</code> — gives 0 back to the OS, meaning 'success'. Non-zero means error."
      ]},
      { type: "callout", style: "warn", title: "C is unforgiving but consistent",
        text: "Forget a semicolon and the compiler complains. Misspell <code>printf</code> and the linker complains. Once you internalise that C will tell you exactly where you broke a rule, debugging stops being scary." },
      { type: "h2", text: "Try it yourself" },
      { type: "p", text: "Click <b>Try it</b> on the block above, change the message, then run it." }
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    printf("Hello, World!\\n");\n    return 0;\n}\n`
  },

  {
    id: "found-2",
    title: "Variables and Types — The Memory Model",
    subtitle: "Variables aren't names. They're labelled boxes in RAM.",
    blocks: [
      { type: "p", text: "A variable in C is a <b>name for a region of memory of a fixed size</b>. The type tells the compiler how big that region is and how to interpret the bits inside." },
      { type: "code", lang: "c", code:
`int    age      = 21;        // 4 bytes, whole number
double price    = 19.99;     // 8 bytes, real number
char   grade    = 'A';       // 1 byte, single character
char   name[20] = "Asha";    // 20 bytes, an array of chars` },
      { type: "h2", text: "The common types you actually use" },
      { type: "list", items: [
        "<code>int</code> — whole numbers like 0, -7, 1000. Use for counts, indices, IDs.",
        "<code>double</code> — decimals like 3.14, prices, percentages. Use for money. (<code>float</code> is also decimal but less precise — pick double unless you have a reason.)",
        "<code>char</code> — a single character like 'a'. Note the SINGLE quotes. Strings use double quotes and live in arrays of char.",
        "<code>long</code> — a bigger int. <code>unsigned int</code> — int that can't be negative.",
      ]},

      { type: "h2", text: "Declaring vs initialising" },
      { type: "code", lang: "c", code:
`int x;          // declared but uninitialised — contains GARBAGE
int y = 0;      // declared AND initialised
x = 5;          // assigned later
y = y + 1;      // y is now 1` },
      { type: "callout", style: "danger", title: "Uninitialised variables = bugs",
        text: "If you declare <code>int x;</code> and read <code>x</code> before assigning, you'll print whatever stale bits were in that memory cell. Always initialise. Always." },

      { type: "h2", text: "Naming rules and conventions" },
      { type: "list", items: [
        "Letters, digits, underscore. Cannot start with a digit. Case-sensitive.",
        "By convention: variables are <code>snake_case</code>, constants are <code>UPPER_CASE</code>.",
        "Be descriptive. <code>units_remaining</code> beats <code>x</code> every time."
      ]}
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    int    age   = 21;\n    double price = 19.99;\n    char   grade = 'A';\n\n    printf("Age: %d, Price: %.2f, Grade: %c\\n", age, price, grade);\n    return 0;\n}\n`
  },

  {
    id: "found-3",
    title: "printf and scanf — Talking to the User",
    subtitle: "Format specifiers are how you connect data to text.",
    blocks: [
      { type: "h2", text: "printf — output" },
      { type: "p", text: "<code>printf</code> prints text. To plug a value into the text, use a <b>format specifier</b> (a placeholder) and pass the value after the string." },
      { type: "code", lang: "c", code:
`int    units = 42;
double price = 19.99;
char   c     = 'A';

printf("Units: %d\\n", units);     // %d for int
printf("Price: %.2f\\n", price);   // %.2f for double, 2 decimals
printf("Grade: %c\\n", c);         // %c for char
printf("Many: %d and %.2f\\n", units, price);` },

      { type: "h2", text: "Common specifiers (memorise these)" },
      { type: "list", items: [
        "<code>%d</code> — int",
        "<code>%f</code> — float / double; use <code>%.2f</code> to limit decimals",
        "<code>%c</code> — single character",
        "<code>%s</code> — string (an array of char)",
        "<code>%lf</code> — double in <code>scanf</code> (NOT <code>%f</code>!)",
        "<code>\\n</code> — newline; <code>\\t</code> — tab"
      ]},

      { type: "h2", text: "scanf — input" },
      { type: "p", text: "<code>scanf</code> reads from the keyboard into a variable. You must pass the <b>address</b> of the variable using <code>&</code> — except for strings (arrays already are addresses)." },
      { type: "code", lang: "c", code:
`int    age;
double price;
char   name[50];

printf("Enter age: ");
scanf("%d", &age);          // & needed

printf("Enter price: ");
scanf("%lf", &price);       // %lf for double, & needed

printf("Enter name: ");
scanf("%s", name);          // no & for arrays; %s reads until whitespace` },

      { type: "callout", style: "warn", title: "The two scanf gotchas that catch everyone",
        text: "1) <code>%lf</code> in scanf for double, but <code>%f</code> in printf — yes, asymmetric, blame history. 2) <code>%s</code> stops at the first space, so 'Asha Lugwana' becomes just 'Asha'. To read a full line, use <code>fgets(name, sizeof(name), stdin);</code>." },

      { type: "h2", text: "Reading a full line safely" },
      { type: "code", lang: "c", code:
`char name[50];
printf("Full name: ");
fgets(name, sizeof(name), stdin);  // reads up to 49 chars including spaces` }
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    int age;\n    double height;\n\n    printf("Enter your age: ");\n    scanf("%d", &age);\n\n    printf("Enter your height in metres: ");\n    scanf("%lf", &height);\n\n    printf("You are %d years old and %.2f m tall.\\n", age, height);\n    return 0;\n}\n`
  },

  {
    id: "found-4",
    title: "Operators and Expressions",
    subtitle: "Arithmetic, comparison, logic — the building blocks.",
    blocks: [
      { type: "h2", text: "Arithmetic" },
      { type: "code", lang: "c", code:
`int a = 10, b = 3;
printf("%d\\n", a + b);   // 13
printf("%d\\n", a - b);   // 7
printf("%d\\n", a * b);   // 30
printf("%d\\n", a / b);   // 3   <-- INTEGER DIVISION drops the remainder!
printf("%d\\n", a % b);   // 1   <-- modulo: the remainder

double x = 10.0, y = 3.0;
printf("%f\\n", x / y);   // 3.333333` },
      { type: "callout", style: "danger", title: "Integer division will bite you",
        text: "<code>5 / 2</code> in C is <code>2</code>, not <code>2.5</code>. If you want the decimal, at least one operand must be a double: <code>5.0 / 2</code> is <code>2.5</code>. Mixing this up causes the classic 'my percentage is always zero' bug." },

      { type: "h2", text: "Comparison (returns 1 = true, 0 = false)" },
      { type: "code", lang: "c", code:
`a == b   // equal? (NOT =)
a != b   // not equal
a <  b   // less than
a <= b   // less or equal
a >  b
a >= b` },
      { type: "callout", style: "warn", title: "= vs ==",
        text: "<code>=</code> assigns. <code>==</code> compares. <code>if (x = 5)</code> ASSIGNS 5 to x and is always true. <code>if (x == 5)</code> compares. The compiler usually warns; listen to it." },

      { type: "h2", text: "Logical operators" },
      { type: "code", lang: "c", code:
`a && b   // AND — true only if both true
a || b   // OR  — true if either true
!a       // NOT — flips true/false

if (age >= 18 && has_id) { ... }
if (units < 5 || amount_paid <= 0) { ... }` },

      { type: "h2", text: "Compound assignment shortcuts" },
      { type: "code", lang: "c", code:
`x += 5;   // same as x = x + 5
x -= 5;
x *= 2;
x /= 2;
x++;      // increment by 1
x--;` }
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    double total = 100.0;\n    double vat   = total * 0.18;     // 18% VAT\n    double net   = total - vat;\n\n    printf("Total: %.2f, VAT: %.2f, Net: %.2f\\n", total, vat, net);\n    return 0;\n}\n`
  },

  /* ============================================================
     MODULE 2 — CONTROL FLOW
     ============================================================ */
  {
    id: "ctrl-1",
    title: "if / else — Decisions",
    subtitle: "Branching is how programs adapt.",
    blocks: [
      { type: "code", lang: "c", code:
`int score = 75;

if (score >= 80) {
    printf("Distinction\\n");
} else if (score >= 60) {
    printf("Credit\\n");
} else if (score >= 50) {
    printf("Pass\\n");
} else {
    printf("Fail\\n");
}` },
      { type: "h2", text: "Rules of thumb" },
      { type: "list", items: [
        "Always use braces <code>{ }</code>, even for one-liners. Saves bugs.",
        "Order matters in <code>else if</code> chains — first true branch wins, the rest are skipped.",
        "Use parentheses around your condition. Always."
      ]},
      { type: "h2", text: "Tariff rate selection (preview of the meter project)" },
      { type: "code", lang: "c", code:
`double rate;
if (strcmp(type, "Domestic") == 0) {
    rate = 700.0;     // UGX per unit, sample
} else {
    rate = 900.0;     // commercial
}` },
      { type: "p", text: "We'll cover <code>strcmp</code> in the strings lesson. For now, note: comparing strings with <code>==</code> does NOT work in C — it compares addresses, not contents." }
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    int score;\n    printf("Enter score: ");\n    scanf("%d", &score);\n\n    if (score >= 80)      printf("Distinction\\n");\n    else if (score >= 60) printf("Credit\\n");\n    else if (score >= 50) printf("Pass\\n");\n    else                  printf("Fail\\n");\n    return 0;\n}\n`
  },

  {
    id: "ctrl-2",
    title: "switch — Multi-way Branching for Menus",
    subtitle: "The natural fit for menu-driven programs like the meter simulator.",
    blocks: [
      { type: "code", lang: "c", code:
`int choice;
printf("1) Register  2) Buy  3) Use  0) Exit\\n");
scanf("%d", &choice);

switch (choice) {
    case 1:
        printf("Register customer\\n");
        break;
    case 2:
        printf("Buy units\\n");
        break;
    case 3:
        printf("Use power\\n");
        break;
    case 0:
        printf("Exit\\n");
        break;
    default:
        printf("Invalid choice\\n");
}` },
      { type: "callout", style: "danger", title: "Forgetting break = fall-through",
        text: "Without <code>break</code>, execution falls into the next case. Sometimes you want that, but usually it's a bug. Make it a habit to type <code>break;</code> immediately after writing <code>case X:</code>." },
      { type: "h2", text: "Switch only works on integers and chars" },
      { type: "p", text: "You cannot <code>switch</code> on a string or a double. For those, use <code>if/else if</code>." }
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    int choice;\n    printf("Choose 1, 2, or 3: ");\n    scanf("%d", &choice);\n\n    switch (choice) {\n        case 1: printf("One\\n"); break;\n        case 2: printf("Two\\n"); break;\n        case 3: printf("Three\\n"); break;\n        default: printf("Unknown\\n");\n    }\n    return 0;\n}\n`
  },

  {
    id: "ctrl-3",
    title: "Loops — for, while, do-while",
    subtitle: "Repeat until a condition is met.",
    blocks: [
      { type: "h2", text: "for — when you know how many times" },
      { type: "code", lang: "c", code:
`for (int i = 0; i < 5; i++) {
    printf("i = %d\\n", i);
}
// Reads as: start at 0; while i<5; after each pass, add 1.` },
      { type: "h2", text: "while — when you don't know how many" },
      { type: "code", lang: "c", code:
`int units = 100;
while (units > 0) {
    units -= 5;        // simulate consumption
    printf("Remaining: %d\\n", units);
}` },
      { type: "h2", text: "do-while — runs at least once (perfect for menus)" },
      { type: "code", lang: "c", code:
`int choice;
do {
    printf("\\n1) Register  2) Buy  0) Exit\\n");
    scanf("%d", &choice);

    switch (choice) {
        case 1: /* register */ break;
        case 2: /* buy      */ break;
        case 0: printf("Goodbye\\n"); break;
        default: printf("Invalid\\n");
    }
} while (choice != 0);` },
      { type: "callout", style: "tip", title: "This is THE menu pattern",
        text: "Memorise the do-while + switch combo above. Almost every CLI menu program in C — including your meter simulator — uses exactly this skeleton." },
      { type: "h2", text: "break and continue" },
      { type: "list", items: [
        "<code>break;</code> — exit the loop immediately.",
        "<code>continue;</code> — skip to the next iteration."
      ]}
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    // Print 1..10 and their squares\n    for (int i = 1; i <= 10; i++) {\n        printf("%2d squared = %3d\\n", i, i * i);\n    }\n    return 0;\n}\n`
  },

  /* ============================================================
     MODULE 3 — FUNCTIONS
     ============================================================ */
  {
    id: "func-1",
    title: "Functions — Decomposing Programs",
    subtitle: "If main is more than ~30 lines, you should be writing functions.",
    blocks: [
      { type: "p", text: "A function is a named, reusable block of code with inputs (parameters) and an output (return value). Functions are how you cut a 200-line problem into ten 20-line pieces you can test individually." },
      { type: "code", lang: "c", code:
`#include <stdio.h>

// Declaration (prototype) — tells compiler the shape
double calculate_vat(double amount);

int main(void) {
    double paid = 50000.0;
    double vat  = calculate_vat(paid);
    printf("VAT: %.2f\\n", vat);
    return 0;
}

// Definition
double calculate_vat(double amount) {
    return amount * 0.18;
}` },
      { type: "h2", text: "Anatomy" },
      { type: "list", items: [
        "<b>Return type</b> — what the function gives back. <code>void</code> means it gives nothing back.",
        "<b>Name</b> — verb-style: <code>register_customer</code>, <code>show_balance</code>.",
        "<b>Parameters</b> — inputs, with types. <code>(void)</code> means none.",
        "<b>Body</b> — the work. <code>return</code> sends a value back."
      ]},
      { type: "h2", text: "Why bother?" },
      { type: "list", items: [
        "Each function fits in your head — easier to write, easier to debug.",
        "You can test pieces in isolation: write <code>calculate_vat</code>, test it, move on.",
        "Reuse: same calculation called from different menu options."
      ]},
      { type: "callout", style: "tip", title: "Rule of thumb",
        text: "Every menu option in your program should call ONE function that does the work. Keep <code>main</code> thin — it should mostly be the menu and the dispatcher." }
    ],
    starter: `#include <stdio.h>\n\ndouble calculate_vat(double amount) {\n    return amount * 0.18;\n}\n\ndouble service_fee(void) {\n    return 3000.0;   // sample monthly fee\n}\n\nint main(void) {\n    double paid = 50000.0;\n    double net  = paid - calculate_vat(paid) - service_fee();\n    printf("Net for units: %.2f\\n", net);\n    return 0;\n}\n`
  },

  /* ============================================================
     MODULE 4 — ARRAYS & STRINGS
     ============================================================ */
  {
    id: "arr-1",
    title: "Arrays — Many Values, One Name",
    subtitle: "Arrays are fixed-size blocks of same-typed values, sitting side-by-side in memory.",
    blocks: [
      { type: "code", lang: "c", code:
`int  scores[5] = {72, 85, 90, 67, 100};
double prices[3];   // uninitialised — garbage values

prices[0] = 19.99;
prices[1] = 5.50;
prices[2] = 100.00;

printf("First score: %d\\n", scores[0]);   // 72
printf("Last score : %d\\n", scores[4]);   // 100` },
      { type: "callout", style: "danger", title: "Arrays are zero-indexed AND C does NOT bounds-check",
        text: "<code>scores[5]</code> is OUT OF BOUNDS for an array of size 5 (valid indices: 0..4). C will happily read or write past the end. This is a classic source of crashes and security holes. Always check your indices." },
      { type: "h2", text: "Looping over an array" },
      { type: "code", lang: "c", code:
`int n = 5;
int total = 0;
for (int i = 0; i < n; i++) {
    total += scores[i];
}
printf("Average: %.2f\\n", (double)total / n);` },
      { type: "p", text: "Note <code>(double)total</code> — that's a <b>cast</b>, forcing the integer to a double so we get a real division (not integer division)." }
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    int n = 5;\n    int scores[] = {72, 85, 90, 67, 100};\n    int total = 0;\n\n    for (int i = 0; i < n; i++) total += scores[i];\n\n    printf("Average: %.2f\\n", (double)total / n);\n    return 0;\n}\n`
  },

  {
    id: "arr-2",
    title: "Strings — Arrays of char with a Hidden Rule",
    subtitle: "A C string is just a char array that ends with '\\0'.",
    blocks: [
      { type: "p", text: "C has no built-in string type. A string is an array of <code>char</code> terminated by a null character <code>'\\0'</code>. That terminator is how every string function knows where you stopped." },
      { type: "code", lang: "c", code:
`char name[10] = "Asha";
// In memory: 'A' 's' 'h' 'a' '\\0' ? ? ? ? ?
// The compiler added the \\0 for you.

printf("%s\\n", name);    // Asha — printf stops at \\0
printf("%c\\n", name[1]); // s — character access` },

      { type: "h2", text: "Useful string functions (#include <string.h>)" },
      { type: "code", lang: "c", code:
`#include <string.h>

strlen(s)             // length, NOT counting the \\0
strcpy(dest, src)     // copy src into dest (dest must be big enough!)
strcat(dest, src)     // append src to dest
strcmp(a, b)          // 0 if equal; <0 if a<b; >0 if a>b
strncpy(d, s, n)      // safer copy with limit` },

      { type: "callout", style: "warn", title: "NEVER compare strings with ==",
        text: "<code>if (name == \"Asha\")</code> compares MEMORY ADDRESSES, not text. Use <code>if (strcmp(name, \"Asha\") == 0)</code>. Memorise this — it is the #1 string bug in beginner C." },

      { type: "h2", text: "Reading a string with spaces" },
      { type: "code", lang: "c", code:
`char full_name[50];
printf("Full name: ");
fgets(full_name, sizeof(full_name), stdin);

// fgets keeps the trailing newline; strip it:
full_name[strcspn(full_name, "\\n")] = '\\0';` }
    ],
    starter: `#include <stdio.h>\n#include <string.h>\n\nint main(void) {\n    char type[15];\n    printf("Enter customer type (Domestic/Commercial): ");\n    scanf("%s", type);\n\n    if (strcmp(type, "Domestic") == 0) {\n        printf("Domestic tariff applies.\\n");\n    } else if (strcmp(type, "Commercial") == 0) {\n        printf("Commercial tariff applies.\\n");\n    } else {\n        printf("Unknown customer type.\\n");\n    }\n    return 0;\n}\n`
  },

  /* ============================================================
     MODULE 5 — POINTERS (the make-or-break topic)
     ============================================================ */
  {
    id: "ptr-1",
    title: "Pointers, Demystified",
    subtitle: "If you understand 'a variable is a labelled box', a pointer is a sticky-note with the box's address on it.",
    blocks: [
      { type: "p", text: "Every variable lives at some memory <b>address</b> (a number). A pointer is just a variable whose value IS an address." },
      { type: "code", lang: "c", code:
`int  age = 21;
int *p   = &age;       // p holds the ADDRESS of age

printf("Value of age:    %d\\n", age);    // 21
printf("Address of age:  %p\\n", &age);   // some hex like 0x7ffe...
printf("Value of p:      %p\\n", p);      // same address
printf("What p points to:%d\\n", *p);     // 21 (dereference)

*p = 30;                // change age THROUGH the pointer
printf("Now age = %d\\n", age);  // 30` },
      { type: "h2", text: "Two operators to memorise" },
      { type: "list", items: [
        "<code>&x</code> — address of x ('give me the sticky-note for x')",
        "<code>*p</code> — value at address p ('open the box at this address')"
      ]},

      { type: "h2", text: "Why we need pointers" },
      { type: "list", items: [
        "<b>To modify a variable inside a function.</b> Without pointers, C functions get COPIES.",
        "<b>To pass big things efficiently.</b> Passing a pointer is cheap; passing a 1MB struct by value copies it.",
        "<b>To allocate memory dynamically.</b> <code>malloc</code> returns a pointer.",
        "<b>To navigate arrays and strings.</b> An array name decays into a pointer to its first element."
      ]},

      { type: "h2", text: "The 'modify in a function' use-case (critical for the meter project)" },
      { type: "code", lang: "c", code:
`void add_units(double *balance, double units) {
    *balance += units;     // dereference and modify the original
}

int main(void) {
    double balance = 0;
    add_units(&balance, 50);   // pass the ADDRESS
    printf("%.2f\\n", balance); // 50.00
    return 0;
}` },
      { type: "callout", style: "tip", title: "When to use a pointer to a struct",
        text: "Whenever a function needs to MODIFY a struct (like updating a Customer's units), pass <code>Customer *c</code>, not <code>Customer c</code>. Inside the function, access fields with <code>c-&gt;name</code> instead of <code>c.name</code>." }
    ],
    starter: `#include <stdio.h>\n\nvoid double_it(int *x) {\n    *x = *x * 2;\n}\n\nint main(void) {\n    int n = 7;\n    double_it(&n);\n    printf("%d\\n", n);   // 14\n    return 0;\n}\n`
  },

  {
    id: "ptr-2",
    title: "Pointers and Arrays",
    subtitle: "An array is (almost) a pointer to its first element.",
    blocks: [
      { type: "code", lang: "c", code:
`int arr[5] = {10, 20, 30, 40, 50};
int *p = arr;          // same as &arr[0]

printf("%d\\n", *p);        // 10
printf("%d\\n", *(p + 1));  // 20  — pointer arithmetic
printf("%d\\n", p[2]);      // 30  — same as arr[2]` },
      { type: "p", text: "Pointer arithmetic moves in <b>units of the pointed-to type</b>. <code>p+1</code> on an int pointer moves 4 bytes (sizeof int), not 1 byte." },
      { type: "callout", style: "warn", title: "Decay",
        text: "When you pass an array to a function, you actually pass a pointer to its first element. <code>void f(int a[10])</code> and <code>void f(int *a)</code> are equivalent. The size info is LOST — you must pass the length too." }
    ],
    starter: `#include <stdio.h>\n\nvoid print_all(int *a, int n) {\n    for (int i = 0; i < n; i++) {\n        printf("%d ", a[i]);\n    }\n    printf("\\n");\n}\n\nint main(void) {\n    int arr[] = {10, 20, 30, 40, 50};\n    print_all(arr, 5);\n    return 0;\n}\n`
  },

  /* ============================================================
     MODULE 6 — STRUCTS
     ============================================================ */
  {
    id: "struct-1",
    title: "Structs — Modelling Real Things",
    subtitle: "Group related fields into one named type.",
    blocks: [
      { type: "p", text: "A struct lets you bundle several values of different types under one name. This is how you model real-world objects in C: a customer, a book, a product." },
      { type: "code", lang: "c", code:
`#include <stdio.h>
#include <string.h>

struct Customer {
    char   name[50];
    char   meter_number[20];
    double units;
};

int main(void) {
    struct Customer c;          // declare an instance
    strcpy(c.name, "Asha");
    strcpy(c.meter_number, "MTR-001");
    c.units = 0.0;

    printf("%s | %s | %.2f units\\n", c.name, c.meter_number, c.units);
    return 0;
}` },

      { type: "h2", text: "typedef — drop the 'struct' keyword everywhere" },
      { type: "code", lang: "c", code:
`typedef struct {
    char   name[50];
    double units;
} Customer;

Customer c;     // no need to write 'struct' anymore
c.units = 0.0;` },

      { type: "h2", text: "Pointers to structs — the arrow operator" },
      { type: "code", lang: "c", code:
`void add_units(Customer *c, double units) {
    c->units += units;       // -> means '(*c).units' — dereference and field access
}

int main(void) {
    Customer me = {"Asha", 0};
    add_units(&me, 50);      // pass address
    printf("%.2f\\n", me.units); // 50.00
    return 0;
}` },
      { type: "callout", style: "tip", title: "The rule",
        text: "Variable of struct type? Use <code>.</code>. Pointer to struct? Use <code>-&gt;</code>. That's it." }
    ],
    starter: `#include <stdio.h>\n#include <string.h>\n\ntypedef struct {\n    char name[50];\n    char type[15];\n    double units;\n} Customer;\n\nvoid print_customer(Customer *c) {\n    printf("%s (%s): %.2f units\\n", c->name, c->type, c->units);\n}\n\nint main(void) {\n    Customer c;\n    strcpy(c.name, "Asha");\n    strcpy(c.type, "Domestic");\n    c.units = 12.5;\n    print_customer(&c);\n    return 0;\n}\n`
  },

  /* ============================================================
     MODULE 7 — FILE I/O
     ============================================================ */
  {
    id: "file-1",
    title: "File I/O — Persisting Data",
    subtitle: "Save customer records so they survive program restart.",
    blocks: [
      { type: "code", lang: "c", code:
`#include <stdio.h>

int main(void) {
    FILE *f = fopen("data.txt", "w");   // "w" = write (overwrites!)
    if (f == NULL) {
        printf("Could not open file\\n");
        return 1;
    }
    fprintf(f, "Asha,MTR-001,12.5\\n");
    fclose(f);

    // Read back
    f = fopen("data.txt", "r");         // "r" = read
    if (f == NULL) return 1;

    char name[50], meter[20];
    double units;
    fscanf(f, "%49[^,],%19[^,],%lf", name, meter, &units);
    printf("Loaded: %s | %s | %.2f\\n", name, meter, units);
    fclose(f);
    return 0;
}` },
      { type: "h2", text: "Open modes" },
      { type: "list", items: [
        "<code>\"r\"</code> — read; file must exist",
        "<code>\"w\"</code> — write; CREATES or TRUNCATES (deletes existing contents!)",
        "<code>\"a\"</code> — append to end",
        "<code>\"r+\"</code>, <code>\"w+\"</code>, <code>\"a+\"</code> — read+write variants"
      ]},
      { type: "callout", style: "danger", title: "Always check fopen and always fclose",
        text: "If <code>fopen</code> returns <code>NULL</code> (no permission, missing file in 'r' mode, disk full), reading/writing crashes. And forgetting <code>fclose</code> can lose data — file writes are buffered." }
    ],
    starter: `#include <stdio.h>\n\nint main(void) {\n    FILE *f = fopen("hello.txt", "w");\n    if (!f) { printf("Open failed\\n"); return 1; }\n    fprintf(f, "Hello from C!\\n");\n    fclose(f);\n\n    char buf[100];\n    f = fopen("hello.txt", "r");\n    if (!f) { printf("Open failed\\n"); return 1; }\n    fgets(buf, sizeof(buf), f);\n    fclose(f);\n\n    printf("Read back: %s", buf);\n    return 0;\n}\n`
  },

  /* ============================================================
     MODULE 8 — DYNAMIC MEMORY
     ============================================================ */
  {
    id: "mem-1",
    title: "malloc and free — Memory You Control",
    subtitle: "When you don't know the size at compile time, allocate on the heap.",
    blocks: [
      { type: "code", lang: "c", code:
`#include <stdio.h>
#include <stdlib.h>

int main(void) {
    int n;
    printf("How many customers? ");
    scanf("%d", &n);

    int *units = malloc(n * sizeof(int));   // ask OS for n ints
    if (units == NULL) {
        printf("Out of memory\\n");
        return 1;
    }

    for (int i = 0; i < n; i++) units[i] = i * 10;
    for (int i = 0; i < n; i++) printf("%d ", units[i]);
    printf("\\n");

    free(units);     // give the memory back. Always.
    units = NULL;    // good habit — prevent use-after-free
    return 0;
}` },
      { type: "h2", text: "Rules" },
      { type: "list", items: [
        "Every <code>malloc</code> needs a matching <code>free</code>. Forget, and you leak memory.",
        "After <code>free</code>, never use the pointer again. Set it to <code>NULL</code> as a safety habit.",
        "<code>malloc(n * sizeof(T))</code> — multiply by sizeof to get bytes.",
        "Use <code>calloc(n, sizeof(T))</code> if you want zeroed memory."
      ]},
      { type: "callout", style: "warn", title: "When NOT to use malloc",
        text: "If you know the size at compile time (e.g., a Customer struct, an array of 100 ints), declare it on the stack instead. Stack allocation is automatic — no <code>free</code> needed. Use <code>malloc</code> only when the size is unknown until runtime." }
    ],
    starter: `#include <stdio.h>\n#include <stdlib.h>\n\nint main(void) {\n    int n = 5;\n    int *a = malloc(n * sizeof(int));\n    if (!a) return 1;\n\n    for (int i = 0; i < n; i++) a[i] = (i+1) * (i+1);\n    for (int i = 0; i < n; i++) printf("%d ", a[i]);\n    printf("\\n");\n\n    free(a);\n    return 0;\n}\n`
  },

  /* ============================================================
     MODULE 9 — DEBUGGING & FINISHING TOUCHES
     ============================================================ */
  {
    id: "debug-1",
    title: "Reading Compiler Errors Without Fear",
    subtitle: "The compiler is talking to you. Listen.",
    blocks: [
      { type: "h2", text: "The five errors you will see most" },
      { type: "ol", items: [
        "<b>expected ';' before ...</b> — you forgot a semicolon at the end of the previous line.",
        "<b>'x' undeclared</b> — you used a variable you didn't declare, or a function whose header you didn't <code>#include</code>.",
        "<b>conflicting types for 'foo'</b> — your function signature in the prototype doesn't match the definition.",
        "<b>format '%d' expects argument of type 'int' but ... 'double'</b> — wrong format specifier for the value.",
        "<b>segmentation fault</b> (at runtime) — you dereferenced a bad pointer or read past an array's end. Suspect uninitialised pointers, missing <code>&amp;</code> in scanf, or out-of-bounds indices."
      ]},
      { type: "callout", style: "tip", title: "The error-fixing routine",
        text: "Always fix the FIRST error in the list, then recompile. Later errors are often caused by the first one. Don't try to fix all 40 errors at once." },

      { type: "h2", text: "printf is your debugger" },
      { type: "p", text: "Sprinkle <code>printf(\"reached A, x=%d\\n\", x);</code> through your code to see what runs and what values are live. Crude but extremely effective." }
    ]
  },

  {
    id: "exam-1",
    title: "Exam Strategy — How to Walk In Calm",
    subtitle: "Process beats panic.",
    blocks: [
      { type: "ol", items: [
        "<b>Read the WHOLE question first.</b> Don't start coding paragraph 1 before you've seen paragraph 4.",
        "<b>Sketch the data and actions on scratch paper.</b> Two minutes here saves twenty later.",
        "<b>Write the menu skeleton first.</b> Compile. Get a working program that does nothing useful — that's your foundation.",
        "<b>Implement options one at a time.</b> Compile after each. Even partial credit needs working compiled code.",
        "<b>Write printf statements as informal tests.</b> 'After buy_units, balance = X' confirms the math.",
        "<b>If stuck, leave a TODO and move on.</b> Don't burn 30 minutes on one feature when the next is easy.",
        "<b>Last 10 minutes: re-read the requirements list and tick each off.</b> Catches forgotten bullets."
      ]},
      { type: "callout", style: "tip", title: "The mindset shift",
        text: "Stop trying to write 'the perfect program'. Write 'the smallest thing that runs', then keep adding. Working code beats clever broken code on every test, every project, every job." }
    ]
  }
];
