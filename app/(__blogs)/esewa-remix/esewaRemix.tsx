export const esewaRemix = `
# Implementing eSewa Payments in a Remix App

Integrating eSewa, Nepal's popular digital wallet, into a web application can enhance payment convenience for users. This blog explains how to implement eSewa payments in a [Remix](https://remix.run/) application. I'll walk you through the critical components of the implementation and highlight key concepts like form handling, UUID generation, signature generation, and eSewa API integration.

---

## Table of Contents



---

## Introduction to eSewa Payments 

eSewa is a widely-used payment gateway in Nepal. Integrating it into a web application involves securely signing transactions and redirecting users to the eSewa payment page.

---

## Setting Up the Remix App

> Start by creating a Remix project:

\`\`\`javascript
 npx create-remix@latest (your project name)
 cd (your project)
 npm run dev (run your project)
\`\`\`

### Folder Structure

- **app/components**
  - \`\`\`EsewaPayment\`\`\` (Frontend component)
- **app/routes**
  - \`\`\`esewa.tsx\`\`\` (route component)

> **Note:** Ensure your development environment is set up with Node.js and all necessary dependencies installed.

---

## Creating the eSewa Payment Component (Front end)

This code demonstrates how to integrate eSewa payment gateway into a React-based application using [Remix](https://remix.run/) fetcher API.:

---

Imports

\`\`\`javascript
import { useEffect, useState, FormEvent } from "react";
import { useFetcher } from "@remix-run/react";
import { v4 as uuidv4 } from "uuid";
\`\`\`

Define the structure of the fetcher data.

\`\`\`javascript
interface FetcherData {
  signature?: string; // Signature for transaction validation
  error?: string; // Error message (if any)
  debug?: {
    // Debug information from server response
    dataString: string;
    inputValues: {
      totalAmount: string;
      transactionUuid: string;
      productCode: string;
    };
  };
}
\`\`\`

Props for the EsewaPayment component.

\`\`\`javascript
interface EsewaPaymentProps {
  amount: number; // Base amount for the product/service  \
  productCode?: string; // Default to "EPAYTEST" for testing
}
\`\`\`

Main body of the EsewaPayment

\`\`\`javascript
export default function EsewaPayment({
  amount,
  productName,
  productCode = "EPAYTEST",
}: EsewaPaymentProps) {
  const fetcher = useFetcher<FetcherData>(); // Remix's fetcher API for server communication
  const [transactionUUID, setTransactionUUID] = useState<string>(""); // UUID for each transaction
  const [signature, setSignature] = useState<string>(""); // Signature received from server
  const [baseUrl, setBaseUrl] = useState<string>(""); // Application's base URL
  const [isSignatureReady, setIsSignatureReady] = useState(false); // Flag to handle signature readiness

  // Calculate VAT (13%) and total amount
  const taxAmount = Math.round(amount * 0.13);
  const totalAmount = amount + taxAmount;

  // Set the base URL on initial render
  useEffect(() => {
    setBaseUrl(window.location.origin);
  }, []);

  // Generate a new UUID for every transaction
  const generateNewTransactionUUID = () => {
    const uniqueUUID = uuidv4();
    setTransactionUUID(uniqueUUID);
    return uniqueUUID;
  };

  // Handle the form submission to request a signature
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Generate a new transaction UUID
    const newTransactionUUID = generateNewTransactionUUID();

    console.log("Submitting with values:", {
      amount,
      taxAmount,
      totalAmount,
      transactionUUID: newTransactionUUID,
      productCode,
    });

    // Create form data for submission
    const formData = new FormData(event.currentTarget);
    formData.set("transaction_uuid", newTransactionUUID);

    setSignature("");
    setIsSignatureReady(false);

    // Submit data to the server to get the signature
    fetcher.submit(formData, { method: "post", action: "/esewa" });
  };
\`\`\`

Effect to update the signature when fetcher data changes

\`\`\`javascript
useEffect(() => {
  if (fetcher.data?.signature) {
    console.log("Received Signature:", fetcher.data.signature);
    console.log("Debug Info:", fetcher.data.debug);
    setSignature(fetcher.data.signature);
    setIsSignatureReady(true);
  } else if (fetcher.data?.error) {
    console.error("Signature generation failed:", fetcher.data.error);
  }
}, [fetcher.data]);
\`\`\`

Automatically submit the eSewa form when the signature is ready

\`\`\`javascript
useEffect(() => {
 if (isSignatureReady) {
   const esewaForm = document.getElementById("esewaForm") as HTMLFormElement;
   if (esewaForm) {
     const formData = new FormData(esewaForm);
     console.log("eSewa Form Data:", Object.fromEntries(formData.entries()));
     esewaForm.submit();
   }
   setIsSignatureReady(false);
 }
}, [isSignatureReady]);
\`\`\`

Prevent rendering until baseUrl is set

\`\`\`javascript
if (!baseUrl) {
 return null;
}
\`\`\`

Return the components of the eSewa form

\`\`\`javascript
  return (
    <div className="space-y-4">

      <form onSubmit={handleSubmit} method="post" className="space-y-4">
        <input type="hidden" name="transaction_uuid" value={transactionUUID} />
        <input type="hidden" name="amount" value={amount.toString()} />
        <input
          type="hidden"
          name="total_amount"
          value={totalAmount.toString()}
        />
        <input type="hidden" name="tax_amount" value={taxAmount.toString()} />
        <input type="hidden" name="product_code" value={productCode} />
        <input type="hidden" name="product_service_charge" value="0" />
        <input type="hidden" name="product_delivery_charge" value="0" />
        <input
          type="hidden"
          name="success_url"
          value={\`$yourbaseUrl/payment-success\`} //your route for payment success use 
        />
        <input
          type="hidden"
          name="failure_url"
          value={\`$yourbaseUrl/payment-failure\`} // your route for payment failure
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="secret" value="8gBm/:&EnhH.1/q" />
        <button
          type="submit"
          className="w-full cursor-pointer flex flex-col items-center border border-green-200 hover:border-green-300 transition-colors bg-green-50 text-black py-2 px-4 rounded-lg"
        >
          <img
            src="/esewa.svg"
            alt="Esewa"
            className="mr-2 w-[150px] h-auto text-white"
          />
          <span className="text-black my-2 font-bold">
            (रु {totalAmount.toLocaleString("en-NP")}) with 13% VAT
          </span>
        </button>
      </form>

     
      <form
        id="esewaForm"
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
        target="_blank"
      >
        <input type="hidden" name="amount" value={amount.toString()} />
        <input type="hidden" name="tax_amount" value={taxAmount.toString()} />
        <input
          type="hidden"
          name="total_amount"
          value={totalAmount.toString()}
        />
        <input type="hidden" name="transaction_uuid" value={transactionUUID} />
        <input type="hidden" name="product_code" value={productCode} />
        <input type="hidden" name="product_service_charge" value="0" />
        <input type="hidden" name="product_delivery_charge" value="0" />
        <input
          type="hidden"
          name="success_url"
          value={\`$yourbaseUrl/payment-success\`}
        />
        <input
          type="hidden"
          name="failure_url"
          value={\`$yourbaseUrl/payment-failure\`}
        />
        <input
          type="hidden"
          name="signed_field_names"
          value="total_amount,transaction_uuid,product_code"
        />
        <input type="hidden" name="signature" value={signature} />
      </form>
    </div>
  );
}
\`\`\`


> Please note that all of these are in the same file.

### Key Notes:

1. **UUID Generation**:

   - The \`uuidv4\` library is used to generate a unique identifier for each transaction to ensure no collisions.

2. **VAT Calculation**:

   - VAT is calculated at 13%, but this value can be adjusted if necessary.

3. **Signature Fetching**:

   - The form submits data to the server to generate a signature, essential for securing eSewa transactions.

4. **Two Forms**:

   - The first form handles generating the signature.
   - The second form is automatically submitted to eSewa after receiving the signature.

5. **Environment Specificity**:

   - The base URL dynamically adapts based on the deployment environment using \`\`\`window.location.origin\`\`\`.

6. **Debugging and Logging**:
   - Console logs provide detailed information during the process to simplify debugging.

---

### Recommendations:

- Replace the \`secret\` field with a secure environment variable to avoid exposing it in the client-side code.
- Validate form inputs and handle errors gracefully to improve user experience.

> The implementation is based on the official documentation available on the [eSewa Epay integration](https://developer.esewa.com.np/pages/Epay#integration).

---

## Esewa Signature Generation (inside route folder) 

\`\`\`javascript
import { ActionFunction, json, LoaderFunction } from "@remix-run/node";
import CryptoJS from "crypto-js";


  // Action function to handle POST requests
  export const action: ActionFunction = async ({ request }) => {
  // Parse the incoming form data
  const formData = await request.formData();

  // Extract necessary fields from the form data
  const totalAmount = formData.get("total_amount");
  const transactionUuid = formData.get("transaction_uuid");
  const productCode = formData.get("product_code");
  const secret = formData.get("secret");

  console.log("Received form data:", {
    totalAmount,
    transactionUuid,
    productCode,
  });

  // Validate the form data
  if (
    typeof totalAmount !== "string" ||
    typeof transactionUuid !== "string" ||
    typeof productCode !== "string" ||
    typeof secret !== "string"
  ) {
    return json({ error: "Invalid form data" }, { status: 400 });
  }

  try {
    // Prepare the data string for signature generation
    const dataString = \`total_amount=\${totalAmount},transaction_uuid=\${transactionUuid},product_code=\${productCode}\`;
    console.log("Data string:", dataString);

    // Generate HMAC SHA256 hash
    const hash = CryptoJS.HmacSHA256(dataString, secret);
    const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

    console.log("Generated signature:", hashInBase64);

    // Return the generated signature and debug info
    return json({
      signature: hashInBase64,
      debug: {
        dataString,
        inputValues: {
          totalAmount,
          transactionUuid,
          productCode,
        },
      },
    });
  } catch (error) {
    // Handle errors during signature generation
    console.error("Error generating signature:", error);
    return json({ error: "Signature generation failed" }, { status: 500 });
  }
};

// Default empty component for the page
export default function Page() {
  return null;
}
\`\`\`

### Note

> This file serves exclusively as an API route, designed to handle signature generation logic rather than render a user interface.\
 As such, the default export (Page) returns null, ensuring no unnecessary UI is rendered.

### Key Notes:

1. **Action Function**

   - Handles form submission via \`POST\` requests and generates a signature for secure eSewa payments.
   - Extracts required fields from the \`FormData\` object.
   - Ensures all fields are validated for type and presence before processing.

2. **Signature Generation**

   - Constructs a string with key-value pairs of the payment data.
   - Utilizes \`CryptoJS\` to generate an HMAC SHA256 hash.
   - Encodes the hash in Base64 format before returning it to the frontend.

3. **Error Handling**

   - Includes error logging to facilitate debugging during development.
   - Returns appropriate error messages if signature generation fails, ensuring robust error management.

---



## Conclusion

By combining the \`EsewaPayment\` component on the frontend and the API route for signature generation logic \`esewa.tsx (route)\`, you create a secure and seamless integration with the eSewa payment gateway. The frontend handles user interactions and collects necessary payment details, while the route ensures data integrity and security by generating a cryptographic signature. This approach not only adheres to best practices for secure payment processing but also offers a scalable foundation for implementing additional payment gateways or enhancements in the future.
`;
