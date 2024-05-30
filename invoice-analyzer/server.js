const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const fs = require('fs');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));

app.post('/upload', upload.array('invoices'), async (req, res) => {
    const files = req.files;
    const extractedInvoices = [];

    for (const file of files) {
        const dataBuffer = fs.readFileSync(file.path);
        const data = await pdfParse(dataBuffer);
        const text = data.text;

        const lines = text.split('\n');
        const regex = /Item name:\s*(.+),\s*Price of item:\s*(\d+(\.\d+)?),\s*Quantity:\s*(\d+),\s*Item SKU:\s*(.+),\s*Seller:\s*(.+),\s*Customer Name:\s*(.+)/;

        for (const line of lines) {
            const match = line.match(regex);
            if (match) {
                const invoiceData = {
                    itemName: match[1],
                    price: parseFloat(match[2]),
                    quantity: parseInt(match[4], 10),
                    sku: match[5],
                    seller: match[6],
                    customerName: match[7],
                };
                extractedInvoices.push(invoiceData);
            }
        }

        // Remove the file after processing
        fs.unlinkSync(file.path);
    }

    res.json({
        invoices: extractedInvoices,
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
