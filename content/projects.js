// Guided projects — built stage by stage so you SEE the pro's process.
// The meter simulator IS the test question you failed. By stage 7 it should feel obvious.
window.PROJECTS = [
  {
    id: "proj-meter",
    title: "Prepaid Meter Simulator",
    summary: "The capstone. Same brief as your test, built the way a pro would build it — one tiny stage at a time. Compile after each.",
    stages: [
      /* -------------------- Stage 1 -------------------- */
      {
        title: "Stage 1 — Read & decompose the brief",
        blocks: [
          { type: "p", text: "Before any code, do steps 1–4 of the routine. We will design the program ON PAPER, then translate." },

          { type: "h3", text: "The brief (as given)" },
          { type: "callout", style: "tip", title: "Original requirement", text:
`Build a Prepaid Meter Simulator in C that helps users understand how units (Yaka units) are calculated and deducted, taking into account VAT, service fees, and different tariff rates for Domestic vs Commercial customers. The program should let the user register a customer, buy units with a token, simulate consumption, view the remaining balance, and view customer details. Use a switch-case menu.` },

          { type: "h3", text: "Step 2 — The data (one struct)" },
          { type: "code", lang: "c", code:
`typedef struct {
    char   name[50];
    char   meter_number[20];
    char   type[15];          // "Domestic" or "Commercial"
    char   token[20];         // last token entered
    double current_units;
    double amount_paid;       // last purchase amount
    double vat_charged;       // last VAT amount
    double service_fee;       // monthly fee
} Customer;` },

          { type: "h3", text: "Step 3 — The actions (one function each)" },
          { type: "list", items: [
            "<code>register_customer(Customer *c)</code>",
            "<code>buy_units(Customer *c)</code>",
            "<code>simulate_usage(Customer *c)</code>",
            "<code>show_balance(Customer *c)</code>",
            "<code>show_details(Customer *c)</code>",
            "<code>show_menu(void)</code>",
            "<code>main()</code> — loop, scanf choice, switch-dispatch"
          ]},

          { type: "h3", text: "Step 4 — Constants we'll need" },
          { type: "code", lang: "c", code:
`#define VAT_RATE        0.18      // 18%
#define SERVICE_FEE     3000.0    // UGX, monthly
#define RATE_DOMESTIC   700.0     // UGX per unit
#define RATE_COMMERCIAL 900.0     // UGX per unit
#define LOW_UNITS_WARN  5.0       // warn if balance falls below this` },

          { type: "callout", style: "tip", title: "We just designed the whole program",
            text: "Stages 2–7 are pure translation of these decisions into syntax. No new big ideas. That's how pros work — heavy thinking up front, light typing after." }
        ]
      },

      /* -------------------- Stage 2 -------------------- */
      {
        title: "Stage 2 — Skeleton: menu loop that does nothing",
        blocks: [
          { type: "p", text: "Smallest first. Write the menu and switch with <code>printf</code> stubs. Compile. Run. See it work end-to-end before writing any real logic." },
          { type: "code", lang: "c", code:
`#include <stdio.h>

void show_menu(void) {
    printf("\\n=== PREPAID METER SIMULATOR ===\\n");
    printf("1) Register Customer\\n");
    printf("2) Buy Units / Enter Token\\n");
    printf("3) Simulate Power Usage\\n");
    printf("4) Show Remaining Balance\\n");
    printf("5) Show Customer Details\\n");
    printf("0) Exit\\n");
    printf("Choose: ");
}

int main(void) {
    int choice;
    do {
        show_menu();
        scanf("%d", &choice);

        switch (choice) {
            case 1: printf("[register]\\n"); break;
            case 2: printf("[buy]\\n");      break;
            case 3: printf("[simulate]\\n"); break;
            case 4: printf("[balance]\\n");  break;
            case 5: printf("[details]\\n");  break;
            case 0: printf("Goodbye.\\n");   break;
            default: printf("Invalid choice.\\n");
        }
    } while (choice != 0);

    return 0;
}` },
          { type: "callout", style: "tip", title: "Run it now",
            text: "Click 'Try it', then press 1, 2, 3, 4, 5, then 0. The shell of your whole program is working. This is psychological — you have momentum." }
        ],
        starter:
`#include <stdio.h>

void show_menu(void) {
    printf("\\n=== PREPAID METER SIMULATOR ===\\n");
    printf("1) Register Customer\\n");
    printf("2) Buy Units / Enter Token\\n");
    printf("3) Simulate Power Usage\\n");
    printf("4) Show Remaining Balance\\n");
    printf("5) Show Customer Details\\n");
    printf("0) Exit\\n");
    printf("Choose: ");
}

int main(void) {
    int choice;
    do {
        show_menu();
        scanf("%d", &choice);
        switch (choice) {
            case 1: printf("[register]\\n"); break;
            case 2: printf("[buy]\\n"); break;
            case 3: printf("[simulate]\\n"); break;
            case 4: printf("[balance]\\n"); break;
            case 5: printf("[details]\\n"); break;
            case 0: printf("Goodbye.\\n"); break;
            default: printf("Invalid choice.\\n");
        }
    } while (choice != 0);
    return 0;
}
`
      },

      /* -------------------- Stage 3 -------------------- */
      {
        title: "Stage 3 — Add the Customer struct and registration",
        blocks: [
          { type: "p", text: "Now we model the data and implement option 1. Notice we pass <code>Customer *c</code> so the function modifies the actual struct in <code>main</code>." },
          { type: "code", lang: "c", code:
`#include <stdio.h>
#include <string.h>

typedef struct {
    char   name[50];
    char   meter_number[20];
    char   type[15];
    char   token[20];
    double current_units;
    double amount_paid;
    double vat_charged;
    double service_fee;
} Customer;

void register_customer(Customer *c) {
    printf("Customer name        : ");
    scanf(" %49[^\\n]", c->name);          // read line into name (up to 49 chars)
    printf("Meter number         : ");
    scanf("%19s", c->meter_number);
    printf("Type (Domestic/Commercial): ");
    scanf("%14s", c->type);

    c->current_units = 0;
    c->amount_paid   = 0;
    c->vat_charged   = 0;
    c->service_fee   = 0;
    strcpy(c->token, "(none)");

    printf("Customer registered.\\n");
}

void show_menu(void) { /* ... same as Stage 2 ... */ }

int main(void) {
    Customer c = {0};        // zero-initialise everything
    int registered = 0;
    int choice;

    do {
        show_menu();
        scanf("%d", &choice);
        switch (choice) {
            case 1:
                register_customer(&c);
                registered = 1;
                break;
            case 2: case 3: case 4: case 5:
                if (!registered) printf("Register a customer first.\\n");
                else printf("[stub for option %d]\\n", choice);
                break;
            case 0: printf("Goodbye.\\n"); break;
            default: printf("Invalid.\\n");
        }
    } while (choice != 0);
    return 0;
}` },
          { type: "callout", style: "warn", title: "scanf input format detail",
            text: "<code>\" %49[^\\n]\"</code> reads up to 49 characters until a newline — that's how we get a name with spaces. The leading space skips any leftover newline from a previous scanf. Without it, fields will gobble newlines and feel broken." }
        ]
      },

      /* -------------------- Stage 4 -------------------- */
      {
        title: "Stage 4 — Buy Units (the unit calculation)",
        blocks: [
          { type: "p", text: "This is the heart of the program. Money in → units out, after deducting VAT and the service fee, divided by the appropriate tariff rate." },
          { type: "h3", text: "The math, in English first" },
          { type: "ol", items: [
            "Take the amount the customer paid.",
            "Compute VAT = amount × 18%. Subtract it.",
            "Subtract the monthly service fee.",
            "Divide what's left by the per-unit tariff rate (different for Domestic vs Commercial).",
            "Add the resulting units to the current balance."
          ]},
          { type: "code", lang: "c", code:
`#define VAT_RATE        0.18
#define SERVICE_FEE     3000.0
#define RATE_DOMESTIC   700.0
#define RATE_COMMERCIAL 900.0

double tariff_for(const char *type) {
    if (strcmp(type, "Commercial") == 0) return RATE_COMMERCIAL;
    return RATE_DOMESTIC;   // default = domestic
}

void buy_units(Customer *c) {
    double amount;
    printf("Enter token (any code): ");
    scanf("%19s", c->token);

    printf("Amount paid (UGX): ");
    scanf("%lf", &amount);

    if (amount <= 0) { printf("Amount must be positive.\\n"); return; }

    double vat       = amount * VAT_RATE;
    double after_vat = amount - vat;
    double after_fee = after_vat - SERVICE_FEE;

    if (after_fee <= 0) {
        printf("Amount too small to cover VAT + service fee.\\n");
        return;
    }

    double rate  = tariff_for(c->type);
    double units = after_fee / rate;

    c->amount_paid    = amount;
    c->vat_charged    = vat;
    c->service_fee    = SERVICE_FEE;
    c->current_units += units;

    printf("\\n--- Receipt ---\\n");
    printf("Token       : %s\\n", c->token);
    printf("Amount paid : %.2f UGX\\n", amount);
    printf("VAT (18%%)   : %.2f UGX\\n", vat);
    printf("Service fee : %.2f UGX\\n", SERVICE_FEE);
    printf("Tariff      : %.2f UGX/unit (%s)\\n", rate, c->type);
    printf("Units bought: %.2f\\n", units);
    printf("New balance : %.2f units\\n", c->current_units);
}` },
          { type: "callout", style: "tip", title: "Test BEFORE moving on",
            text: "Register a Domestic customer, buy with 50,000 UGX. Hand-calculate: VAT = 9000, after VAT = 41000, after fee = 38000, units = 38000/700 ≈ 54.29. Does the program print the same? If yes, ship it. If no, the bug is in <code>buy_units</code>, not anywhere else — that's the value of testing one feature at a time." }
        ]
      },

      /* -------------------- Stage 5 -------------------- */
      {
        title: "Stage 5 — Simulate Power Usage + Low-Balance Warning",
        blocks: [
          { type: "p", text: "Now option 3. Read units consumed, deduct, refuse to go negative, warn when low." },
          { type: "code", lang: "c", code:
`#define LOW_UNITS_WARN 5.0

void simulate_usage(Customer *c) {
    double used;
    printf("Units consumed: ");
    scanf("%lf", &used);

    if (used < 0) { printf("Cannot use negative units.\\n"); return; }
    if (used > c->current_units) {
        printf("Not enough units! You have only %.2f.\\n", c->current_units);
        return;                     // refuse — never go below zero
    }

    c->current_units -= used;
    printf("OK. %.2f units consumed. Remaining: %.2f\\n", used, c->current_units);

    if (c->current_units < LOW_UNITS_WARN) {
        printf("WARNING: balance is low! Top up soon.\\n");
    }
}` },
          { type: "p", text: "Note the three checks: negative, over-balance, and the low-warning. Each maps to one bullet from the brief. Re-reading the requirements while you code is half the battle." }
        ]
      },

      /* -------------------- Stage 6 -------------------- */
      {
        title: "Stage 6 — Show Balance and Show Details",
        blocks: [
          { type: "code", lang: "c", code:
`void show_balance(Customer *c) {
    printf("Customer    : %s\\n", c->name);
    printf("Meter       : %s\\n", c->meter_number);
    printf("Balance     : %.2f units\\n", c->current_units);
}

void show_details(Customer *c) {
    printf("\\n--- Customer details ---\\n");
    printf("Name           : %s\\n", c->name);
    printf("Meter number   : %s\\n", c->meter_number);
    printf("Type           : %s\\n", c->type);
    printf("Last token     : %s\\n", c->token);
    printf("Last amount    : %.2f UGX\\n", c->amount_paid);
    printf("Last VAT       : %.2f UGX\\n", c->vat_charged);
    printf("Service fee    : %.2f UGX\\n", c->service_fee);
    printf("Current units  : %.2f\\n", c->current_units);
}` },
          { type: "p", text: "These are pure print functions. No new logic. Notice how every option is just a 5–25-line function, calling existing data. THAT is decomposition paying off." }
        ]
      },

      /* -------------------- Stage 7 -------------------- */
      {
        title: "Stage 7 — Putting it ALL together (final program)",
        blocks: [
          { type: "p", text: "Here is the complete program. Click <b>Try it</b> to load it into the playground, then run it." },
          { type: "code", lang: "c", code:
`#include <stdio.h>
#include <string.h>

#define VAT_RATE        0.18
#define SERVICE_FEE     3000.0
#define RATE_DOMESTIC   700.0
#define RATE_COMMERCIAL 900.0
#define LOW_UNITS_WARN  5.0

typedef struct {
    char   name[50];
    char   meter_number[20];
    char   type[15];
    char   token[20];
    double current_units;
    double amount_paid;
    double vat_charged;
    double service_fee;
} Customer;

double tariff_for(const char *type) {
    if (strcmp(type, "Commercial") == 0) return RATE_COMMERCIAL;
    return RATE_DOMESTIC;
}

void register_customer(Customer *c) {
    printf("Customer name             : ");
    scanf(" %49[^\\n]", c->name);
    printf("Meter number              : ");
    scanf("%19s", c->meter_number);
    printf("Type (Domestic/Commercial): ");
    scanf("%14s", c->type);

    c->current_units = 0;
    c->amount_paid   = 0;
    c->vat_charged   = 0;
    c->service_fee   = 0;
    strcpy(c->token, "(none)");

    printf("Customer registered.\\n");
}

void buy_units(Customer *c) {
    double amount;
    printf("Enter token (any code): ");
    scanf("%19s", c->token);
    printf("Amount paid (UGX): ");
    scanf("%lf", &amount);

    if (amount <= 0) { printf("Amount must be positive.\\n"); return; }

    double vat       = amount * VAT_RATE;
    double after_vat = amount - vat;
    double after_fee = after_vat - SERVICE_FEE;

    if (after_fee <= 0) {
        printf("Amount too small to cover VAT + service fee.\\n");
        return;
    }

    double rate  = tariff_for(c->type);
    double units = after_fee / rate;

    c->amount_paid    = amount;
    c->vat_charged    = vat;
    c->service_fee    = SERVICE_FEE;
    c->current_units += units;

    printf("\\n--- Receipt ---\\n");
    printf("Token       : %s\\n", c->token);
    printf("Amount paid : %.2f UGX\\n", amount);
    printf("VAT (18%%)   : %.2f UGX\\n", vat);
    printf("Service fee : %.2f UGX\\n", SERVICE_FEE);
    printf("Tariff      : %.2f UGX/unit (%s)\\n", rate, c->type);
    printf("Units bought: %.2f\\n", units);
    printf("New balance : %.2f units\\n", c->current_units);
}

void simulate_usage(Customer *c) {
    double used;
    printf("Units consumed: ");
    scanf("%lf", &used);
    if (used < 0) { printf("Cannot use negative units.\\n"); return; }
    if (used > c->current_units) {
        printf("Not enough units! You have only %.2f.\\n", c->current_units);
        return;
    }
    c->current_units -= used;
    printf("OK. %.2f units consumed. Remaining: %.2f\\n", used, c->current_units);
    if (c->current_units < LOW_UNITS_WARN)
        printf("WARNING: balance is low! Top up soon.\\n");
}

void show_balance(Customer *c) {
    printf("Customer: %s | Meter: %s | Balance: %.2f units\\n",
           c->name, c->meter_number, c->current_units);
}

void show_details(Customer *c) {
    printf("\\n--- Customer details ---\\n");
    printf("Name           : %s\\n", c->name);
    printf("Meter number   : %s\\n", c->meter_number);
    printf("Type           : %s\\n", c->type);
    printf("Last token     : %s\\n", c->token);
    printf("Last amount    : %.2f UGX\\n", c->amount_paid);
    printf("Last VAT       : %.2f UGX\\n", c->vat_charged);
    printf("Service fee    : %.2f UGX\\n", c->service_fee);
    printf("Current units  : %.2f\\n", c->current_units);
}

void show_menu(void) {
    printf("\\n=== PREPAID METER SIMULATOR ===\\n");
    printf("1) Register Customer\\n");
    printf("2) Buy Units / Enter Token\\n");
    printf("3) Simulate Power Usage\\n");
    printf("4) Show Remaining Balance\\n");
    printf("5) Show Customer Details\\n");
    printf("0) Exit\\n");
    printf("Choose: ");
}

int main(void) {
    Customer c   = {0};
    int registered = 0;
    int choice;

    do {
        show_menu();
        if (scanf("%d", &choice) != 1) {       // bad input recovery
            int ch; while ((ch = getchar()) != '\\n' && ch != EOF) {}
            printf("Numeric choice expected.\\n");
            continue;
        }
        switch (choice) {
            case 1: register_customer(&c); registered = 1; break;
            case 2: if (!registered) { printf("Register first.\\n"); break; }
                    buy_units(&c); break;
            case 3: if (!registered) { printf("Register first.\\n"); break; }
                    simulate_usage(&c); break;
            case 4: if (!registered) { printf("Register first.\\n"); break; }
                    show_balance(&c); break;
            case 5: if (!registered) { printf("Register first.\\n"); break; }
                    show_details(&c); break;
            case 0: printf("Goodbye.\\n"); break;
            default: printf("Invalid choice.\\n");
        }
    } while (choice != 0);
    return 0;
}` },
          { type: "callout", style: "tip", title: "Read every function. Then close this page and rewrite the program from scratch.",
            text: "That last step — rewriting from memory — is the difference between 'I read it' and 'I own it'. Do it twice. The second time will be twice as fast." }
        ],
        starter:
`#include <stdio.h>
#include <string.h>

#define VAT_RATE        0.18
#define SERVICE_FEE     3000.0
#define RATE_DOMESTIC   700.0
#define RATE_COMMERCIAL 900.0
#define LOW_UNITS_WARN  5.0

typedef struct {
    char   name[50];
    char   meter_number[20];
    char   type[15];
    char   token[20];
    double current_units;
    double amount_paid;
    double vat_charged;
    double service_fee;
} Customer;

double tariff_for(const char *type) {
    if (strcmp(type, "Commercial") == 0) return RATE_COMMERCIAL;
    return RATE_DOMESTIC;
}

void register_customer(Customer *c) {
    printf("Customer name             : ");
    scanf(" %49[^\\n]", c->name);
    printf("Meter number              : ");
    scanf("%19s", c->meter_number);
    printf("Type (Domestic/Commercial): ");
    scanf("%14s", c->type);
    c->current_units = 0;
    c->amount_paid   = 0;
    c->vat_charged   = 0;
    c->service_fee   = 0;
    strcpy(c->token, "(none)");
    printf("Customer registered.\\n");
}

void buy_units(Customer *c) {
    double amount;
    printf("Enter token (any code): ");
    scanf("%19s", c->token);
    printf("Amount paid (UGX): ");
    scanf("%lf", &amount);
    if (amount <= 0) { printf("Amount must be positive.\\n"); return; }
    double vat = amount * VAT_RATE;
    double after_vat = amount - vat;
    double after_fee = after_vat - SERVICE_FEE;
    if (after_fee <= 0) { printf("Amount too small.\\n"); return; }
    double rate = tariff_for(c->type);
    double units = after_fee / rate;
    c->amount_paid = amount; c->vat_charged = vat; c->service_fee = SERVICE_FEE;
    c->current_units += units;
    printf("\\n--- Receipt ---\\nToken: %s\\nAmount: %.2f\\nVAT: %.2f\\nFee: %.2f\\nRate: %.2f\\nUnits: %.2f\\nBalance: %.2f\\n",
        c->token, amount, vat, SERVICE_FEE, rate, units, c->current_units);
}

void simulate_usage(Customer *c) {
    double used;
    printf("Units consumed: ");
    scanf("%lf", &used);
    if (used < 0) { printf("Cannot use negative units.\\n"); return; }
    if (used > c->current_units) { printf("Not enough! Have %.2f.\\n", c->current_units); return; }
    c->current_units -= used;
    printf("Remaining: %.2f\\n", c->current_units);
    if (c->current_units < LOW_UNITS_WARN) printf("WARNING: balance low!\\n");
}

void show_balance(Customer *c) {
    printf("%s | %s | %.2f units\\n", c->name, c->meter_number, c->current_units);
}

void show_details(Customer *c) {
    printf("\\nName: %s\\nMeter: %s\\nType: %s\\nToken: %s\\nAmount: %.2f\\nVAT: %.2f\\nFee: %.2f\\nUnits: %.2f\\n",
        c->name, c->meter_number, c->type, c->token, c->amount_paid, c->vat_charged, c->service_fee, c->current_units);
}

void show_menu(void) {
    printf("\\n=== PREPAID METER SIMULATOR ===\\n");
    printf("1) Register  2) Buy  3) Use  4) Balance  5) Details  0) Exit\\nChoose: ");
}

int main(void) {
    Customer c = {0};
    int registered = 0, choice;
    do {
        show_menu();
        if (scanf("%d", &choice) != 1) { int ch; while ((ch=getchar())!='\\n' && ch!=EOF){} printf("Number please.\\n"); continue; }
        switch (choice) {
            case 1: register_customer(&c); registered=1; break;
            case 2: if(!registered){printf("Register first.\\n");break;} buy_units(&c); break;
            case 3: if(!registered){printf("Register first.\\n");break;} simulate_usage(&c); break;
            case 4: if(!registered){printf("Register first.\\n");break;} show_balance(&c); break;
            case 5: if(!registered){printf("Register first.\\n");break;} show_details(&c); break;
            case 0: printf("Goodbye.\\n"); break;
            default: printf("Invalid.\\n");
        }
    } while (choice != 0);
    return 0;
}
`
      }
    ]
  },

  /* ===================================================================
     PROJECT 2 — Student Records (multiple records, arrays of structs)
     =================================================================== */
  {
    id: "proj-students",
    title: "Student Records System",
    summary: "Same skeleton, but multiple records using an array of structs. Trains the muscle for any 'manage many things' problem.",
    stages: [
      {
        title: "Stage 1 — The plan",
        blocks: [
          { type: "p", text: "Almost every CRUD-style program (Create, Read, Update, Delete a list of items) follows the same shape as the meter simulator, but stores a LIST of records instead of one." },
          { type: "h3", text: "Data model" },
          { type: "code", lang: "c", code:
`typedef struct {
    int  id;
    char name[50];
    char course[30];
    int  marks[3];     // three subjects
    double average;
} Student;

#define MAX_STUDENTS 100
Student students[MAX_STUDENTS];
int student_count = 0;` },
          { type: "h3", text: "Actions" },
          { type: "list", items: [
            "<code>add_student()</code> — append to the array, increment count",
            "<code>list_students()</code> — loop and print",
            "<code>find_student(int id)</code> — return index or -1",
            "<code>update_marks(int id)</code> — find then overwrite",
            "<code>delete_student(int id)</code> — shift later elements left",
            "<code>compute_average(Student *s)</code> — helper"
          ]}
        ]
      },
      {
        title: "Stage 2 — Full implementation",
        blocks: [
          { type: "code", lang: "c", code:
`#include <stdio.h>
#include <string.h>

#define MAX_STUDENTS 100

typedef struct {
    int  id;
    char name[50];
    char course[30];
    int  marks[3];
    double average;
} Student;

Student students[MAX_STUDENTS];
int student_count = 0;

void compute_average(Student *s) {
    s->average = (s->marks[0] + s->marks[1] + s->marks[2]) / 3.0;
}

int find_index(int id) {
    for (int i = 0; i < student_count; i++)
        if (students[i].id == id) return i;
    return -1;
}

void add_student(void) {
    if (student_count >= MAX_STUDENTS) { printf("Full.\\n"); return; }
    Student *s = &students[student_count];
    printf("ID: ");      scanf("%d", &s->id);
    printf("Name: ");    scanf(" %49[^\\n]", s->name);
    printf("Course: ");  scanf(" %29[^\\n]", s->course);
    printf("Marks (3, space-separated): ");
    scanf("%d %d %d", &s->marks[0], &s->marks[1], &s->marks[2]);
    compute_average(s);
    student_count++;
    printf("Added.\\n");
}

void list_students(void) {
    if (!student_count) { printf("No students yet.\\n"); return; }
    printf("\\n%-5s %-20s %-15s %-10s %s\\n", "ID", "Name", "Course", "Marks", "Avg");
    for (int i = 0; i < student_count; i++) {
        Student *s = &students[i];
        printf("%-5d %-20s %-15s %d/%d/%d   %.2f\\n",
               s->id, s->name, s->course, s->marks[0], s->marks[1], s->marks[2], s->average);
    }
}

void update_marks(void) {
    int id; printf("ID to update: "); scanf("%d", &id);
    int idx = find_index(id);
    if (idx < 0) { printf("Not found.\\n"); return; }
    Student *s = &students[idx];
    printf("New marks: "); scanf("%d %d %d", &s->marks[0], &s->marks[1], &s->marks[2]);
    compute_average(s);
    printf("Updated.\\n");
}

void delete_student(void) {
    int id; printf("ID to delete: "); scanf("%d", &id);
    int idx = find_index(id);
    if (idx < 0) { printf("Not found.\\n"); return; }
    for (int i = idx; i < student_count - 1; i++) students[i] = students[i+1];
    student_count--;
    printf("Deleted.\\n");
}

int main(void) {
    int choice;
    do {
        printf("\\n1) Add  2) List  3) Update  4) Delete  0) Exit\\n> ");
        scanf("%d", &choice);
        switch (choice) {
            case 1: add_student(); break;
            case 2: list_students(); break;
            case 3: update_marks(); break;
            case 4: delete_student(); break;
            case 0: break;
            default: printf("Invalid.\\n");
        }
    } while (choice != 0);
    return 0;
}` }
        ],
        starter: null
      }
    ]
  },

  /* ===================================================================
     PROJECT 3 — Number-guessing game (loops + randomness)
     =================================================================== */
  {
    id: "proj-guess",
    title: "Number Guessing Game",
    summary: "Quick win to practise loops, conditionals, and rand(). 30 minutes end to end.",
    stages: [
      {
        title: "The complete program",
        blocks: [
          { type: "code", lang: "c", code:
`#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned)time(NULL));
    int secret = rand() % 100 + 1;     // 1..100
    int guess, tries = 0;

    printf("I'm thinking of a number from 1 to 100.\\n");
    do {
        printf("Your guess: ");
        scanf("%d", &guess);
        tries++;

        if (guess < secret) printf("Too low.\\n");
        else if (guess > secret) printf("Too high.\\n");
        else printf("Got it in %d tries!\\n", tries);
    } while (guess != secret);

    return 0;
}` },
          { type: "callout", style: "tip", title: "Variations to build muscle",
            text: "Now extend it: limit to 7 tries; let the user pick the range; play multiple rounds and track wins. Each variation takes 5–10 minutes and reinforces a concept." }
        ],
        starter:
`#include <stdio.h>
#include <stdlib.h>
#include <time.h>

int main(void) {
    srand((unsigned)time(NULL));
    int secret = rand() % 100 + 1;
    int guess, tries = 0;

    printf("I'm thinking of a number 1..100.\\n");
    do {
        printf("Guess: ");
        scanf("%d", &guess);
        tries++;
        if (guess < secret)      printf("Too low.\\n");
        else if (guess > secret) printf("Too high.\\n");
        else printf("Correct in %d tries!\\n", tries);
    } while (guess != secret);
    return 0;
}
`
      }
    ]
  }
];
