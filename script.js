let usuarioC = String

/**/
document.getElementById('showRegisterBtn').addEventListener('click', function () {
    document.getElementById('loginContainer').classList.add('hidden');
    document.getElementById('registerContainer').classList.remove('hidden');
});


document.getElementById('showLoginBtn').addEventListener('click', function () {
    document.getElementById('registerContainer').classList.add('hidden');
    document.getElementById('loginContainer').classList.remove('hidden');
});

// Manejo de inicio de sesión
document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    console.log("usuario" + document.getElementById('loginUsername').value)
    console.log("contra " + document.getElementById('loginPassword').value)
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    const storedUser = localStorage.getItem(document.getElementById('loginUsername').value);
    console.log(document.getElementById('loginUsername').value)
    usuarioC = document.getElementById('loginUsername').value
    console.log(usuarioC)
    if (storedUser && storedUser === password) {
        alert('¡Bienvenido!');
        localStorage.setItem('loggedInUser', username);
        document.getElementById('loginContainer').classList.add('hidden');
        document.getElementById('data').classList.remove('hidden');
        // Redirige a data.html
        // window.location.href = 'data.html';
    } else {
        alert('Usuario o contraseña incorrectos');
    }
});



// navbar
document.getElementById("menu-open-button").addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.add("show");
});

document.getElementById("menu-close-button").addEventListener("click", function () {
    document.querySelector(".nav-menu").classList.remove("show");
});

document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;

    if (localStorage.getItem(username)) {
        alert('El nombre de usuario ya existe');
    } else {
        localStorage.setItem(username, password);
        alert('Registro exitoso');
        document.getElementById('registerContainer').classList.add('hidden');
        document.getElementById('loginContainer').classList.remove('hidden');
    }
});
let codigo = ""
let fechaEmision = ""
let numero = ""
let ruc = ""
let nombre = ""
let proveedor = ""
let producto = ""
let precio = ""
let fechaCreacion = ""
let horaCreacion = ""


// Estructura de datos para almacenar todos los registros
const allData = [];

let rowToUpdate = null; // Inicializa rowToUpdate

document.getElementById("registroCompras").addEventListener("submit", function (event) {
    event.preventDefault();

    // Obtención de valores del formulario
    const fechaEmision = document.getElementById("fechaEmision").value;
    const numero = document.getElementById("numero").value;
    const ruc = document.getElementById("ruc").value;
    const nombre = document.getElementById("nombre").value;
    const proveedor = document.getElementById("proveedor").value;
    const producto = document.getElementById("producto").value;
    const precio = parseFloat(document.getElementById("precio").value);
    const cantidad = parseInt(document.getElementById("cantidad").value);
    const incluirIGV = document.getElementById("igv").value;



    // Cálculos de IGV y total
    let IGV = 0;
    let total = precio * cantidad; // Inicializa total con el cálculo base de precio y cantidad

    if (incluirIGV == "si") {
        IGV = total * 0.18; // Calcular el IGV si está marcado
        total += IGV; // Agregar el IGV al total
    }

    // Datos adicionales
    const usuarioRegistro = "usuario"; // Cambiar por el nombre del usuario actual
    const currentDate = new Date();
    const fechaCreacion = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD
    const horaCreacion = currentDate.toTimeString().split(" ")[0]; // HH:MM:SS

    // Crear el objeto con los datos de la compra
    const newData = {
  
        FechaEmision: fechaEmision,
        Numero: numero,
        RUC: ruc,
        Nombre: nombre,
        Proveedor: proveedor,
        Producto: producto,
        Precio: precio,
        Moneda: "MN",
        Cantidad: cantidad,
        IGV: IGV,
        Total: total,
        UsuarioRegistro: usuarioRegistro,
        FechaCreacion: fechaCreacion,
        HoraCreacion: horaCreacion
    };

    // Actualizar o agregar fila en la tabla
    const table = document.getElementById("dataTable");

    if (rowToUpdate) {
        // Actualizar fila existente
        rowToUpdate.cells[0].textContent = fechaEmision;
        rowToUpdate.cells[1].textContent = numero;
        rowToUpdate.cells[2].textContent = ruc;
        rowToUpdate.cells[3].textContent = nombre;
        rowToUpdate.cells[4].textContent = proveedor;
        rowToUpdate.cells[5].textContent = producto;
        rowToUpdate.cells[6].textContent = cantidad;
        rowToUpdate.cells[7].textContent = precio;
        rowToUpdate.cells[8].textContent = total;

        // Cambiar el texto del botón a "Registrar"
        document.querySelector('button[type="submit"]').textContent = "Registrar";
        rowToUpdate = null;
    } else {
        // Crear nueva fila
        const newRow = table.insertRow();
      
        newRow.insertCell(0).textContent = fechaEmision;
        newRow.insertCell(1).textContent = numero;
        newRow.insertCell(2).textContent = ruc;
        newRow.insertCell(3).textContent = nombre;
        newRow.insertCell(4).textContent = proveedor;
        newRow.insertCell(5).textContent = producto;
        newRow.insertCell(6).textContent = cantidad;
        newRow.insertCell(7).textContent = precio;
        newRow.insertCell(8).textContent = total;

        const actionsCell = newRow.insertCell(9);

        // Crear botón de ver detalles
        const detailButton = document.createElement("button");
        detailButton.classList.add("btn", "btn-info", "me-3");
        detailButton.innerHTML = '<i class="fas fa-eye"></i>';
        detailButton.title = "Ver Detalle";
        detailButton.addEventListener("click", function () {
            const modalContent = document.getElementById("modalContent");
            modalContent.innerHTML = `
            <div class="modal-content">
                <div class="modal-header" style="background-color: lightsteelblue;">
                    <div class="w-100 text-center">
                        <h5 class="modal-title" style="font-weight: bold; font-family: 'Arial', sans-serif;" id="countryModalLabel">DETALLE DE COMPRAS</h5>
                    </div>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="cardt">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-6">
                                <p><strong>Fecha Emisión:</strong> ${fechaEmision}</p>
                                <p><strong>Número:</strong> ${numero}</p>
                                <p><strong>RUC:</strong> ${ruc}</p>
                                <p><strong>Nombre:</strong> ${nombre}</p>
                            </div>
                            <div class="col-md-6">
                                <p><strong>Proveedor:</strong> ${proveedor}</p>
                                <p><strong>Producto:</strong> ${producto}</p>
                                <p><strong>Precio:</strong> ${precio}</p>
                                <p><strong>Usuario Registro:</strong> ${usuarioRegistro}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;

            const myModal = new bootstrap.Modal(document.getElementById('detailModal'));
            myModal.show();
        });

        // Crear botón de actualizar
        const updateButton = document.createElement("button");
        updateButton.classList.add("btn", "btn-warning", "me-3");
        updateButton.innerHTML = '<i class="fas fa-edit"></i>';
        updateButton.title = "Actualizar";
        updateButton.addEventListener("click", function () {
            document.getElementById("fechaEmision").value = fechaEmision;
            document.getElementById("numero").value = numero;
            document.getElementById("ruc").value = ruc;
            document.getElementById("nombre").value = nombre;
            document.getElementById("proveedor").value = proveedor;
            document.getElementById("producto").value = producto;
            document.getElementById("precio").value = precio;
            document.getElementById("cantidad").value = cantidad;
            document.querySelector('button[type="submit"]').textContent = "Actualizar";

            rowToUpdate = newRow;
        });

        // Crear botón de eliminar
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn', 'btn-danger');
        deleteButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        deleteButton.addEventListener('click', function () {
            const row = deleteButton.closest('tr');
            row.remove(); // Elimina la fila de la tabla
        });

        // Agregar botones a la celda de acciones
        actionsCell.appendChild(detailButton);
        actionsCell.appendChild(updateButton);
        actionsCell.appendChild(deleteButton);
    }

    // Limpiar formulario
    document.getElementById("registroCompras").reset();
});


document.getElementById('excelFile').addEventListener('change', function (e) {
    const file = e.target.files[0];

    if (file && file.name.endsWith('.xlsx')) {
        const reader = new FileReader();
        reader.onload = function (event) {
            const data = event.target.result;
            const workbook = XLSX.read(data, { type: 'binary' });

            // Tomamos la primera hoja del archivo
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsonData = XLSX.utils.sheet_to_json(sheet);

            // Limpiamos la tabla antes de agregar nuevos datos
            const tableBody = document.getElementById('dataTable');
            tableBody.innerHTML = '';

            // Variables de contador para cada número de factura
            const contador = {};

            // Creamos un array de filas usando map()
            const rows = jsonData.map(item => {
                // Contar cuántas veces se ha registrado el número de factura
                if (!contador[item.Numero]) {
                    contador[item.Numero] = 1; // Si no existe, inicializa en 1
                } else {
                    contador[item.Numero] += 1; // Si existe, incrementa el contador
                }

                // Calculamos el total con IGV
                const total = item.Precio * item.Cantidad;
                const totalConIGV = item.IGV ? total + item.IGV : total; // Total con IGV si está presente

                // Creamos la fila con los datos
                return [
                    contador[item.Numero],       // Codigo
                    item.FechaEmision,           // FechaEmision
                    item.Numero,                 // Numero
                    item.RUC,                    // RUC
                    item.Nombre,                 // Nombre
                    item.Proveedor,              // Proveedor
                    item.Producto,               // Producto
                    item.Cantidad,               // Cantidad
                    item.Precio,                 // Precio
                    totalConIGV.toFixed(2),      // Total con IGV
                ];
            });

            // Insertamos las filas en la tabla
            rows.forEach(rowData => {
                const newRow = tableBody.insertRow();
                rowData.forEach(cellData => {
                    const cell = newRow.insertCell();
                    cell.textContent = cellData;
                });

                // Agregamos el botón de acción (ejemplo: Eliminar)
                const actionsCell = newRow.insertCell();
                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar";
                deleteButton.onclick = function () {
                    tableBody.deleteRow(newRow.rowIndex); // Elimina la fila
                };
                actionsCell.appendChild(deleteButton);
            });
        };
        reader.readAsBinaryString(file);
    }
});




/*
document.getElementById("downloadPdf").addEventListener("click", function () {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    doc.text("Datos Registrados", 10, 10);

    const data = [];
    document.querySelectorAll("#dataTable tr").forEach((row) => {
        const rowData = [];
        row.querySelectorAll("td").forEach((cell) => {
            rowData.push(cell.innerText);
        });
        data.push(rowData);
    });

    doc.autoTable({
        head: [["Fecha Emisión", "Número", "RUC", "Nombre", "Proveedor", "Producto", "Precio"]],
        body: data,
    });

    doc.save("DatosRegistrados.pdf");
});


document.getElementById("downloadExcel").addEventListener("click", function () {
    const table = document.querySelector("table");
    const workbook = XLSX.utils.table_to_book(table, { sheet: "Datos" });

    // Establecer fecha y hora de creación
    const creationDate = new Date();
    const formattedDate = creationDate.toLocaleString(); // Formato: "12/4/2024, 10:30:45"

    // Obtener la hoja de datos
    const sheet = workbook.Sheets["Datos"];
    
    // Insertar fecha de creación en la primera fila
    sheet["H1"] = { v: "Fecha de Creación: " };

    // Ajustar el rango para insertar la fecha
    const header = sheet['!rows'] || [];
    sheet['!rows'] = [
        { hpt: 30, vpt: 15 }, // Ajuste de alto para encabezados
        ...header
    ];
    
    // Colocar colores de fondo en los encabezados
    const headerCells = ["A2", "B2", "C2", "D2", "E2", "F2", "G2","H2"];
    headerCells.forEach(cell => {
        sheet[cell].s = {
            fill: { fgColor: { rgb: "4F81BD" } }, // Color azul para la cabecera
            font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 }, // Texto blanco en negrita
            alignment: { horizontal: "center", vertical: "center" }
        };
    });

    // Estilo para las filas de la tabla
    const range = XLSX.utils.decode_range(sheet["!ref"]);
    for (let row = range.s.r + 1; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
            const cell = sheet[XLSX.utils.encode_cell({ r: row, c: col })];
            if (cell) {
                cell.s = {
                    alignment: { horizontal: "center", vertical: "center" },
                    border: {
                        top: { style: "thin" },
                        left: { style: "thin" },
                        bottom: { style: "thin" },
                        right: { style: "thin" }
                    }
                };
            }
        }
    }

    // Eliminar columna "Acciones" antes de exportar
    const rangeCols = XLSX.utils.decode_range(sheet["!ref"]);
    for (let row = rangeCols.s.r; row <= rangeCols.e.r; row++) {
        const cell = sheet[XLSX.utils.encode_cell({ r: row, c: 7 })]; // Columna "Acciones"
        if (cell) delete sheet[XLSX.utils.encode_cell({ r: row, c: 7 })];
    }

    // Descargar archivo con diseño
    XLSX.writeFile(workbook, "DatosRegistrados.xlsx");
});*/


document.getElementById('printButton').addEventListener('click', function () {
    // Calcular el precio total
    let totalPrecio = 0;
    allData.forEach(item => {
        // Convertir item.Total a número si no lo es
        const precio = parseFloat(item.Total); // Asegúrate de que Total sea un número

        // Verificar si el precio es válido antes de sumarlo
        if (!isNaN(precio)) {
            totalPrecio += precio; // Sumar al total
        }
    });

    console.log(totalPrecio);  // Verifica el resultado

    // Crear el contenido de la tabla
    let printContent = `
        <div style="text-align: center; font-size: 24px; font-weight: bold;">
            LISTA DE COMPRAS
        </div>
        <table class="table table-bordered" style="width: 100%; border-collapse: collapse;">
            <thead style="background-color: #343a40; color: white;">
                <tr>
                            <th>Codigo</th>
                            <th>Fecha Emisión</th>
                            <th>Fecha de Creacion</th>
                            <th>Hora de Creacion</th>
                            <th>Número</th>
                            <th>RUC</th>
                            <th>Nombre</th>
                            <th>Proveedor</th>
                            <th>Producto</th>
                            <th>Cantidad</th>   
                            <th>IGV</th> 
                            <th>Precio</th>
                         
                           
                            
                            <th>Total</th>
                    
                    <
                </tr>
            </thead>
            <tbody>
    `;

    // Rellenar las filas de la tabla con los datos dinámicos
    allData.forEach(item => {
        printContent += `
            <tr>
                          <td>${item.Codigo}</td>
            <td>${item.FechaEmision}</td>  
            <td>${item.FechaCreacion}</td>
            <td>${item.HoraCreacion}</td>
            <td>${item.Numero}</td>
            <td>${item.RUC}</td>
            <td>${item.Nombre}</td>
            <td>${item.Proveedor}</td>
            <td>${item.Producto}</td>   <td>${item.Cantidad}</td>
           
      <td>S/.${item.IGV.toFixed(2)}</td>

            <td>S/. ${item.Precio}</td>
               <td>S/.${item.Total}</td>
          
          
            </tr>
        `;
    });

    // Agregar la fila de total al final de la tabla
    printContent += `
            <tr style="font-weight: bold; background-color: #f8f9fa;">
                <td colspan="12" style="text-align: right;">Total</td>
                <td>S/.${totalPrecio}</td>
            </tr>
    `;

    printContent += `</tbody></table>`;

    // Crear una nueva ventana para imprimir
    let printWindow = window.open('', '_blank', 'width=800,height=600');
    printWindow.document.write(`
        <html>
            <head>
                <title>Impresión de Lista de Compras</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                    }
                    th, td {
                        padding: 8px;
                        border: 1px solid #ddd;
                    }
                    th {
                        background-color: #343a40;
                        color: white;
                    }
                    tr:nth-child(even) {
                        background-color: #f2f2f2;
                    }
                </style>
            </head>
            <body>
                ${printContent}
            </body>
        </html>
    `);

    // Esperar a que el contenido se haya cargado y luego imprimir
    printWindow.document.close();
    printWindow.print();
});


document.getElementById('downloadExcel').addEventListener('click', function () {
    // Datos dinámicos de ejemplo (reemplázalo con tu variable allData)

    // Crear una hoja de Excel a partir de los datos
    const worksheet = XLSX.utils.json_to_sheet(allData);

    // Crear un libro de trabajo (workbook)
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Lista de Compras');

    // Generar el archivo Excel y descargarlo
    XLSX.writeFile(workbook, 'lista_de_compras.xlsx');
});

document.getElementById('downloadPdf').addEventListener('click', function () {


    // Calcular el total de compras
    const totalCompras = allData.reduce((acc, item) => acc + item.Total, 0);

    // Crear un nuevo documento PDF
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Agregar título al PDF
    doc.setFontSize(16);
    doc.text('Lista de Compras', 105, 20, null, null, 'center');

    // Crear encabezado de la tabla
    const headers = [
        [
            'Codigo',
            'Fecha Emisión',
            'Número',
            'RUC',
            'Nombre',
            'Proveedor',
            'Producto',
            'Cantidad',
            'IGV',
            'Precio',
            'Total',
        ],
    ];

    // Convertir los datos a un formato adecuado para la tabla
    const rows = allData.map(item => [
        item.Codigo,
        item.FechaEmision,
        item.Numero,
        item.RUC,
        item.Nombre,
        item.Proveedor,
        item.Producto,
        item.Cantidad,
        "S/." + item.IGV.toFixed(2),
        "S/." + item.Precio,
        "S/." + item.Total,
    ]);

    // Agregar tabla al PDF usando autoTable
    doc.autoTable({
        head: headers,
        body: rows,
        startY: 30, // Posición inicial de la tabla
        styles: {
            fontSize: 8,
            cellPadding: 2,
        },
        headStyles: {
            fillColor: [52, 58, 64], // Color de fondo del encabezado
            textColor: [255, 255, 255], // Color de texto del encabezado
        },
        alternateRowStyles: {
            fillColor: [245, 245, 245], // Color de fondo alternado para filas
        },
    });

    // Agregar el total de compras debajo de la tabla
    const finalY = doc.lastAutoTable.finalY; // Obtener la posición final de la tabla
    doc.setFontSize(12);
    doc.text(`Total de Compras: S/. ${totalCompras.toFixed(2)}`, 14, finalY + 10);

    // Descargar el archivo PDF
    doc.save('lista_de_compras.pdf');
});


