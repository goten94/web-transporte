import { useRef, useState } from 'react';
import styles from './TicketFactura.module.css';

function TicketFactura({ venta, onCerrar }) {
  const [imprimiendo, setImprimiendo] = useState(false);
  const ticketRef = useRef();
  const iframeRef = useRef(null);

  const handleImprimir = () => {
    if (imprimiendo) return;
    setImprimiendo(true);

    try {
      const contenidoTicket = ticketRef.current.innerHTML;
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      iframeDoc.open();
      iframeDoc.write(`
        <html>
          <head>
            <title>Ticket de Venta</title>
            <style>
              body { font-family: 'Courier New', monospace; margin: 20px; }
              .ticket { max-width: 300px; margin: auto; }
              .linea { border-top: 1px dashed #000; margin: 10px 0; }
            </style>
          </head>
          <body>
            <div class="ticket">${contenidoTicket}</div>
          </body>
        </html>
      `);
      iframeDoc.close();

      iframe.contentWindow.focus();
      iframe.contentWindow.print();

      // Después de imprimir, liberamos el estado
      setTimeout(() => {
        setImprimiendo(false);
      }, 500);
    } catch (error) {
      console.error('Error al imprimir:', error);
      setImprimiendo(false);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <div ref={ticketRef} className={styles.ticket}>
          <h3>SMTVN - Ticket de Venta</h3>
          <p><strong>Minibús:</strong> {venta.minibus.placa}</p>
          <p><strong>Asiento:</strong> {venta.fila+1}-{venta.columna+1}</p>
          <p><strong>Pasajero:</strong> {venta.pasajero.nombre}</p>
          <p><strong>Documento:</strong> {venta.pasajero.documento}</p>
          <p><strong>Destino:</strong> {venta.destino}</p>
          <p><strong>Costo:</strong> Bs. {venta.costo}</p>
          <p><strong>Fecha:</strong> {new Date().toLocaleDateString()}</p>
          <div className={styles.linea}></div>
          <p>¡Gracias por viajar con nosotros!</p>
        </div>
        <div className={styles.acciones}>
          <button 
            type="button" 
            onClick={handleImprimir} 
            className={styles.imprimirBtn}
            disabled={imprimiendo}
          >
            {imprimiendo ? 'Imprimiendo...' : 'Imprimir Ticket'}
          </button>
          <button type="button" onClick={onCerrar} className={styles.cerrarBtn}>Cerrar</button>
        </div>
        <iframe ref={iframeRef} style={{ display: 'none' }} title="impresion-iframe" />
      </div>
    </div>
  );
}

export default TicketFactura;