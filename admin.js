document.addEventListener('DOMContentLoaded', () => {
    // Verificar si el usuario ha iniciado sesion
    const isAdmin = localStorage.getItem('isAdmin');

    // Si no es admin, lo expulsamos de vuelta al index
    if (!isAdmin || isAdmin !== 'true') {
        window.location.href = 'index.html';
    }

    // Funcionalidad de Cerrar Sesion
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Elimina la sesion guardada
            localStorage.removeItem('isAdmin');
            // Redirige
            window.location.href = 'index.html';
        });
    }

    // Leer y Mostrar Estadísticas
    const kpiVisitas = document.getElementById('kpi-visitas');
    const kpiSugerencias = document.getElementById('kpi-sugerencias');
    const kpiArchivos = document.getElementById('kpi-archivos');
    const containerSug = document.getElementById('lista-sugerencias');
    
    let visitas = localStorage.getItem('pageViews') || 0;
    if(kpiVisitas) kpiVisitas.innerText = visitas;
    
    let arraySug = JSON.parse(localStorage.getItem('sugerencias') || '[]');
    if(kpiSugerencias) kpiSugerencias.innerText = arraySug.length;
    
    let archivosCount = JSON.parse(localStorage.getItem('archivosSemanales') || '[]').length;
    if(kpiArchivos) kpiArchivos.innerText = archivosCount;
    
    // Pintar Sugerencias recibidas
    window.renderSugerencias = function() {
        let arraySug = JSON.parse(localStorage.getItem('sugerencias') || '[]');
        if(kpiSugerencias) kpiSugerencias.innerText = arraySug.length;
        
        if(containerSug) {
            if(arraySug.length === 0) {
                containerSug.innerHTML = '<p>No hay mensajes nuevos.</p>';
            } else {
                let html = '';
                arraySug.forEach((sug, index) => {
                    html += `
                    <div style="background:rgba(0,0,0,0.4); padding:20px; border-radius:10px; border-left:4px solid var(--primary);">
                        <h3 style="margin-bottom:10px; display:flex; justify-content:space-between; flex-wrap:wrap;">
                            <span>👤 De: <span style="color:var(--primary);">${sug.nombre}</span></span>
                            <span style="font-size:0.8em; color:var(--text-muted);">${sug.fecha}</span>
                        </h3>
                        <p style="font-style:italic; margin-bottom:15px; line-height:1.5;">"${sug.mensaje}"</p>
                        
                        ${sug.respuesta ? 
                            `<div style="background:rgba(255,255,255,0.05); padding:10px; border-radius:5px; margin-bottom:15px; border-left:2px solid var(--secondary); font-size:0.95em;">
                                <strong style="color:var(--secondary);">💬 Tu respuesta:</strong><br>${sug.respuesta}
                            </div>` : 
                            ''}
                        
                        <div style="display:flex; gap:10px;">
                            <button onclick="responderSugerencia(${index})" class="btn-primary" style="padding:5px 15px; font-size:0.8em;">${sug.respuesta ? 'Editar Respuesta' : 'Responder'}</button>
                            <button onclick="eliminarSugerencia(${index})" class="btn-primary" style="padding:5px 15px; font-size:0.8em; background:rgba(255,0,0,0.1); border-color:#ff4444; color:#ff4444; box-shadow:none;">Eliminar</button>
                        </div>
                    </div>
                    `;
                });
                containerSug.innerHTML = html;
            }
        }
    };
    
    renderSugerencias();

    // ---- ARCHIVOS POR SEMANA ----
    const SEMANAS = ['s1','s2','s3','s4','s5','s6','s7','s8'];

    // Auto-limpiar archivos > 7 dias
    SEMANAS.forEach(function(s) {
        let arr = JSON.parse(localStorage.getItem('archivos_'+s) || '[]');
        const ahora = Date.now();
        const semana = 7*24*60*60*1000;
        const filtrado = arr.filter(a => (ahora - a.fecha) < semana);
        if(filtrado.length !== arr.length) localStorage.setItem('archivos_'+s, JSON.stringify(filtrado));
    });

    // Conectar cada input a su semana
    SEMANAS.forEach(function(s) {
        const inp = document.getElementById('file'+s.toUpperCase());
        if(!inp) return;
        inp.addEventListener('change', function(e) {
            const files = e.target.files;
            if(!files.length) return;

            let pending = files.length;
            let arr = JSON.parse(localStorage.getItem('archivos_'+s) || '[]');

            for(let i=0; i<files.length; i++) {
                (function(file) {
                    const MAX = 4 * 1024 * 1024; // 4 MB limit for preview
                    const meta = {
                        nombre: file.name,
                        tamano: (file.size/1024).toFixed(1)+' KB',
                        fecha: Date.now(),
                        fechaStr: new Date().toLocaleDateString(),
                        tipo: file.type,
                        dataUrl: null
                    };

                    if(file.size <= MAX) {
                        const reader = new FileReader();
                        reader.onload = function(ev) {
                            meta.dataUrl = ev.target.result;
                            arr.push(meta);
                            pending--;
                            if(pending === 0) {
                                try {
                                    localStorage.setItem('archivos_'+s, JSON.stringify(arr));
                                } catch(err) {
                                    // Storage full — save without dataUrl
                                    arr[arr.length-1].dataUrl = null;
                                    localStorage.setItem('archivos_'+s, JSON.stringify(arr));
                                }
                                renderSemana(s);
                                updateKpiArchivos();
                            }
                        };
                        reader.readAsDataURL(file);
                    } else {
                        // File too large — store metadata only
                        arr.push(meta);
                        pending--;
                        if(pending === 0) {
                            localStorage.setItem('archivos_'+s, JSON.stringify(arr));
                            renderSemana(s);
                            updateKpiArchivos();
                        }
                    }
                })(files[i]);
            }
            inp.value = '';
        });
    });

    // Render individual semana
    window.renderSemana = function(s) {
        const cont = document.getElementById('files-'+s);
        const count = document.getElementById('count-'+s);
        if(!cont) return;
        let arr = JSON.parse(localStorage.getItem('archivos_'+s) || '[]');
        if(count) count.textContent = arr.length ? arr.length+' archivo'+(arr.length>1?'s':'')+' subido'+(arr.length>1?'s':'') : '';
        if(!arr.length) { cont.innerHTML = '<p style="font-size:0.78rem;opacity:0.45;letter-spacing:1px;">▸ Sin archivos</p>'; return; }
        cont.innerHTML = arr.map((a,i) => {
            const isImg = a.tipo && a.tipo.startsWith('image/') && a.dataUrl;
            return `
            <div class="file-item" style="align-items: flex-start; gap: 15px;">
              ${isImg ? `<img src="${a.dataUrl}" onclick="verArchivo('${s}',${i})" style="width:50px;height:50px;border-radius:8px;object-fit:cover;cursor:pointer;border:1px solid rgba(0,245,255,0.3);box-shadow:0 0 10px rgba(0,245,255,0.1);">` : `<div style="font-size:1.8rem;width:50px;height:50px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.05);border-radius:8px;">📄</div>`}
              <div style="flex:1;min-width:0;">
                <div class="file-name" style="margin-bottom:4px;">${a.nombre}</div>
                <div class="file-meta">
                  <span class="file-badge">💾 ${a.tamano}</span>
                  <span class="file-badge">📅 ${a.fechaStr}</span>
                  ${a.dataUrl ? '<span class="file-badge" style="background:rgba(0,255,136,0.12);border-color:rgba(0,255,136,0.3);color:#00ff88;">✓ Visualizable</span>' : ''}
                </div>
                <div style="display:flex;gap:8px;margin-top:10px;">
                  ${a.dataUrl ? `<button onclick="verArchivo('${s}',${i})" style="padding:6px 14px;font-size:0.8rem;background:rgba(0,245,255,0.15);color:#00f5ff;border:1px solid rgba(0,245,255,0.4);border-radius:6px;cursor:pointer;font-family:'Rajdhani',sans-serif;font-weight:700;transition:all 0.3s;" onmouseover="this.style.background='rgba(0,245,255,0.3)';this.style.transform='translateY(-1px)'" onmouseout="this.style.background='rgba(0,245,255,0.15)';this.style.transform='none'">👁 VER DIRECTO</button>` : ''}
                  <button class="btn-del-file" onclick="eliminarArchivoSemana('${s}',${i})" style="padding:6px 14px;font-size:0.8rem;">✕ BORRAR</button>
                </div>
              </div>
            </div>`;
        }).join('');
    };

    // Render todas las semanas
    window.renderTodasSemanas = function() {
        SEMANAS.forEach(s => renderSemana(s));
        updateKpiArchivos();
    };

    function updateKpiArchivos() {
        const kpiA = document.getElementById('kpi-archivos');
        if(!kpiA) return;
        let total = 0;
        SEMANAS.forEach(s => { total += JSON.parse(localStorage.getItem('archivos_'+s)||'[]').length; });
        kpiA.innerText = total;
    }

    renderTodasSemanas();

});

// Eliminar archivo de una semana
window.eliminarArchivoSemana = function(s, index) {
    let arr = JSON.parse(localStorage.getItem('archivos_'+s) || '[]');
    arr.splice(index,1);
    localStorage.setItem('archivos_'+s, JSON.stringify(arr));
    if(window.renderSemana) renderSemana(s);
    const kpiA = document.getElementById('kpi-archivos');
    if(kpiA) {
        let total=0;
        ['s1','s2','s3','s4','s5','s6','s7','s8'].forEach(k=>{ total+=JSON.parse(localStorage.getItem('archivos_'+k)||'[]').length; });
        kpiA.innerText=total;
    }
};

// Borrar todos los archivos de todas las semanas
window.borrarTodosPorSemana = function() {
    if(!confirm('¿Borrar TODOS los archivos de todas las semanas?')) return;
    ['s1','s2','s3','s4','s5','s6','s7','s8'].forEach(s => localStorage.removeItem('archivos_'+s));
    if(window.renderTodasSemanas) renderTodasSemanas();
    alert('Todos los archivos han sido eliminados.');
};

// Borrar archivos de UNA sola semana
window.borrarSemana = function(s) {
    const numeros = {'s1':'1','s2':'2','s3':'3','s4':'4','s5':'5','s6':'6','s7':'7','s8':'8'};
    if(!confirm('¿Borrar todos los archivos de la Semana '+numeros[s]+'?')) return;
    localStorage.removeItem('archivos_'+s);
    if(window.renderSemana) renderSemana(s);
    const kpiA = document.getElementById('kpi-archivos');
    if(kpiA) {
        let total=0;
        ['s1','s2','s3','s4','s5','s6','s7','s8'].forEach(k=>{ total+=JSON.parse(localStorage.getItem('archivos_'+k)||'[]').length; });
        kpiA.innerText=total;
    }
};

// Ver/previsualizar archivo
window.verArchivo = function(s, index) {
    const arr = JSON.parse(localStorage.getItem('archivos_'+s) || '[]');
    const a = arr[index];
    if(!a || !a.dataUrl) return;

    // Create or reuse viewer modal
    let modal = document.getElementById('fileViewerModal');
    if(!modal) {
        modal = document.createElement('div');
        modal.id = 'fileViewerModal';
        modal.style.cssText = 'position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,0.88);backdrop-filter:blur(12px);display:flex;flex-direction:column;justify-content:center;align-items:center;padding:20px;';
        modal.innerHTML = `
            <div style="max-width:860px;width:100%;background:linear-gradient(135deg,rgba(5,0,40,0.95),rgba(3,0,25,0.98));border:1px solid rgba(0,245,255,0.2);border-radius:18px;overflow:hidden;position:relative;box-shadow:0 20px 60px rgba(0,0,0,0.7);">
                <div style="padding:16px 22px;border-bottom:1px solid rgba(0,245,255,0.15);display:flex;justify-content:space-between;align-items:center;background:rgba(0,245,255,0.04);">
                    <div id="fvTitle" style="font-family:'Orbitron',sans-serif;font-size:0.9rem;color:#00f5ff;letter-spacing:1px;word-break:break-all;"></div>
                    <button onclick="document.getElementById('fileViewerModal').style.display='none'" style="background:rgba(255,0,80,0.15);border:1px solid rgba(255,0,80,0.4);color:#ff4466;width:34px;height:34px;border-radius:8px;cursor:pointer;font-size:1.1rem;flex-shrink:0;margin-left:12px;transition:all 0.3s;" onmouseover="this.style.background='rgba(255,0,80,0.35)'" onmouseout="this.style.background='rgba(255,0,80,0.15)'">✕</button>
                </div>
                <div id="fvBody" style="padding:20px;max-height:72vh;overflow:auto;display:flex;justify-content:center;align-items:flex-start;"></div>
            </div>`;
        document.body.appendChild(modal);
        modal.addEventListener('click', function(e){ if(e.target===modal) modal.style.display='none'; });
    }

    document.getElementById('fvTitle').textContent = '👁 ' + a.nombre;
    const body = document.getElementById('fvBody');
    const tipo = a.tipo || '';

    if(tipo.startsWith('image/')) {
        body.innerHTML = `<img src="${a.dataUrl}" style="max-width:100%;max-height:65vh;border-radius:10px;object-fit:contain;box-shadow:0 0 40px rgba(0,245,255,0.15);">`;
    } else if(tipo === 'application/pdf') {
        body.innerHTML = `<iframe src="${a.dataUrl}" style="width:100%;height:65vh;border:none;border-radius:8px;"></iframe>`;
    } else if(tipo.startsWith('video/')) {
        body.innerHTML = `<video src="${a.dataUrl}" controls style="max-width:100%;max-height:65vh;border-radius:10px;"></video>`;
    } else if(tipo.startsWith('audio/')) {
        body.innerHTML = `<audio src="${a.dataUrl}" controls style="width:100%;margin-top:20px;"></audio>`;
    } else if(tipo.startsWith('text/')) {
        // Decode base64 text
        try {
            const text = atob(a.dataUrl.split(',')[1]);
            body.innerHTML = `<pre style="white-space:pre-wrap;word-break:break-all;color:rgba(255,255,255,0.85);font-size:0.85rem;max-height:65vh;overflow:auto;padding:10px;">${text.replace(/</g,'&lt;')}</pre>`;
        } catch(e) {
            body.innerHTML = '<p style="color:rgba(255,255,255,0.5);">No se puede previsualizar este archivo de texto.</p>';
        }
    } else {
        body.innerHTML = `
            <div style="text-align:center;padding:30px;">
                <div style="font-size:3rem;margin-bottom:12px;">📄</div>
                <p style="color:rgba(255,255,255,0.6);margin-bottom:20px;">Este tipo de archivo no tiene vista previa directa.</p>
                <a href="${a.dataUrl}" download="${a.nombre}" style="background:linear-gradient(135deg,#00f5ff,#bf00ff);color:#000;padding:12px 24px;border-radius:10px;font-weight:700;text-decoration:none;font-family:'Rajdhani',sans-serif;letter-spacing:1px;">⬇ Descargar Archivo</a>
            </div>`;
    }

    modal.style.display = 'flex';
};
window.responderSugerencia = function(index) {
    let arraySug = JSON.parse(localStorage.getItem('sugerencias') || '[]');
    let rpta = prompt("Escribe tu respuesta a " + arraySug[index].nombre + ":", arraySug[index].respuesta || "");
    if(rpta !== null && rpta.trim() !== '') {
        arraySug[index].respuesta = rpta;
        localStorage.setItem('sugerencias', JSON.stringify(arraySug));
        if(window.renderSugerencias) window.renderSugerencias();
    }
};

window.eliminarSugerencia = function(index) {
    if(confirm("¿Estás seguro de que deseas eliminar este mensaje para siempre?")) {
        let arraySug = JSON.parse(localStorage.getItem('sugerencias') || '[]');
        arraySug.splice(index, 1);
        localStorage.setItem('sugerencias', JSON.stringify(arraySug));
        if(window.renderSugerencias) window.renderSugerencias();
    }
};

// Funcionalidad global de Tabs
window.verTab = function(tabId, btn) {
    const tabs = document.querySelectorAll('.tab-content');
    tabs.forEach(t => t.style.display = 'none');
    
    const btns = document.querySelectorAll('.menu-btn:not(.logout-btn)');
    btns.forEach(b => b.classList.remove('active'));
    
    document.getElementById('tab-' + tabId).style.display = 'block';
    if(btn) btn.classList.add('active');
};

// Funcionalidad global de Temas (Configuración)
window.cambiarTema = function(themeObj) {
    localStorage.setItem('selectedTheme', JSON.stringify(themeObj));
    // Aplica temporalmente en panel también para visualizarlo
    for(let key in themeObj) {
        document.documentElement.style.setProperty(key, themeObj[key]);
    }
    alert("¡Tema actualizado globalmente con éxito!");
};

// Funcionalidad para borrar archivos manualmente
window.borrarArchivosSemanales = function() {
    if(confirm('¿Estás seguro de que deseas borrar todos los archivos de inmediato?')) {
        localStorage.removeItem('archivosSemanales');
        if(window.renderArchivos) window.renderArchivos();
        alert('Todos los archivos han sido borrados.');
    }
};

window.eliminarArchivoUnico = function(index) {
    let archivos = JSON.parse(localStorage.getItem('archivosSemanales') || '[]');
    archivos.splice(index, 1);
    localStorage.setItem('archivosSemanales', JSON.stringify(archivos));
    if(window.renderArchivos) window.renderArchivos();
};
