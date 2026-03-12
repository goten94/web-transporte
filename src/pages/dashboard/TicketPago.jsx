import { useRef, useState } from 'react';
import styles from './TicketPago.module.css';

function TicketPago({ pago, onCerrar }) {
  const [imprimiendo, setImprimiendo] = useState(false);
  const iframeRef = useRef();

  const handleImprimir = () => {
    setImprimiendo(true);
    const contenidoTicket = document.getElementById('contenido-ticket').innerHTML;

    const iframe = iframeRef.current;
    iframe.contentDocument.write(`
      <html>
        <head>
          <title>Ticket de Pago</title>
          <style>
            body { font-family: 'Courier New', monospace; margin: 20px; }
            .ticket { max-width: 300px; margin: auto; }
            .linea { border-top: 1px dashed #000; margin: 10px 0; }
          </style>
        </head>
        <body>
          <div class="ticket">${contenidoTicket}</div>
          <script>
            window.onload = function() {
              window.print();
              setTimeout(() => {
                window.close();
              }, 500);
            };
          <\/script>
        </body>
      </html>
    `);
    iframe.contentDocument.close();

    // Simular fin de impresión después de un tiempo
    setTimeout(() => setImprimiendo(false), 1000);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div id="contenido-ticket" className={styles.ticket}>
          <h3>SMTVN - Comprobante de Pago</h3>
          <p><strong>Afiliado:</strong> {pago.afiliado.nombre}</p>
          <p><strong>Vehículo:</strong> {pago.afiliado.vehiculo.marca} - {pago.afiliado.vehiculo.placa}</p>
          <p><strong>Mes cancelado:</strong> {pago.mes}</p>
          <p><strong>Monto:</strong> Bs. {pago.monto}</p>
          <p><strong>Depositante:</strong> {pago.depositante}</p>
          <p><strong>Fecha:</strong> {pago.fecha}</p>
          <p><strong>Hora:</strong> {pago.hora}</p>
          <div className={styles.linea}></div>
          <p>¡Gracias por tu aporte!</p>
        </div>

        {/* iframe oculto para impresión */}
        <iframe ref={iframeRef} style={{ display: 'none' }} title="impresor"></iframe>

        <div className={styles.acciones}>
          <button
            onClick={handleImprimir}
            disabled={imprimiendo}
            className={styles.imprimirBtn}
          >
            {imprimiendo ? 'Imprimiendo...' : 'Imprimir Ticket'}
          </button>
          <button onClick={onCerrar} className={styles.cerrarBtn}>Cerrar</button>
        </div>
      </div>
    </div>
  );
}

export default TicketPago;