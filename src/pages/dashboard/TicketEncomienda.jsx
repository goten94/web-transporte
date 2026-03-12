import { useRef, useState } from 'react';
import styles from './TicketEncomienda.module.css';

function TicketEncomienda({ encomienda, onCerrar }) {
  const [imprimiendo, setImprimiendo] = useState(false);
  const iframeRef = useRef();

  const handleImprimir = () => {
    setImprimiendo(true);
    const contenidoTicket = document.getElementById('contenido-ticket-encomienda').innerHTML;

    const iframe = iframeRef.current;
    iframe.contentDocument.write(`
      <html>
        <head>
          <title>Ticket de Encomienda</title>
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

    setTimeout(() => setImprimiendo(false), 1000);
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div id="contenido-ticket-encomienda" className={styles.ticket}>
          <h3>SMTVN - Ticket de Encomienda</h3>
          <p><strong>Minibús:</strong> {encomienda.minibusPlaca}</p>
          <p><strong>Remitente:</strong> {encomienda.remitente}</p>
          <p><strong>Tel. Remitente:</strong> {encomienda.telefonoRemitente}</p>
          <p><strong>Destinatario:</strong> {encomienda.destinatario}</p>
          <p><strong>Tel. Destinatario:</strong> {encomienda.telefonoDestinatario}</p>
          <p><strong>Destino:</strong> {encomienda.destino}</p>
          <p><strong>Descripción:</strong> {encomienda.descripcion}</p> {/* Nuevo campo */}
          <p><strong>Costo:</strong> Bs. {encomienda.costo}</p>
          <p><strong>Fecha:</strong> {encomienda.fecha}</p>
          <p><strong>Hora:</strong> {encomienda.hora}</p>
          <div className={styles.linea}></div>
          <p>¡Gracias por usar nuestro servicio!</p>
        </div>

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

export default TicketEncomienda;