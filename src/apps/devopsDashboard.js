(() => {
    const defaults = [
        { id: 'web', name: 'neoncity-web', branch: 'main', commit: 'a81f39c', status: 'success', duration: '2m 18s', ago: '4 min ago' },
        { id: 'assets', name: 'asset-builder', branch: 'feature/cache', commit: 'c29d7e1', status: 'running', duration: '1m 06s', ago: 'Running now' },
        { id: 'infra', name: 'infra-validate', branch: 'main', commit: '7be041a', status: 'failed', duration: '0m 42s', ago: '18 min ago' },
        { id: 'docs', name: 'docs-preview', branch: 'docs/v2', commit: '38cf610', status: 'success', duration: '0m 54s', ago: '1 hour ago' }
    ];
    const statusNames = { success: 'Passed', running: 'Running', failed: 'Failed', queued: 'Queued' };
    const safe = (value) => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

    class DevOpsDashboard {
        constructor() {
            try {
                const stored = JSON.parse(localStorage.getItem('neoncityDevOpsPipelines') || 'null');
                this.pipelines = Array.isArray(stored) && stored.length ? stored : defaults.map((item) => ({ ...item }));
            } catch (_) {
                this.pipelines = defaults.map((item) => ({ ...item }));
            }
            this.logs = [
                { level: 'INFO', text: 'Dashboard ready. All systems are connected.' },
                { level: 'PASS', text: 'neoncity-web · Build and smoke tests passed.' },
                { level: 'WARN', text: 'infra-validate · Policy check needs attention.' }
            ];
        }

        save() {
            localStorage.setItem('neoncityDevOpsPipelines', JSON.stringify(this.pipelines));
        }

        render() {
            const app = document.getElementById('devops-dashboard');
            if (!app) return;
            const count = (status) => this.pipelines.filter((pipeline) => pipeline.status === status).length;
            const active = count('running') + count('queued');
            app.innerHTML = `
                <div class="devops-shell">
                    <header class="devops-heading"><div><span class="devops-eyebrow">NEONCITY PLATFORM / OVERVIEW</span><h2>DevOps Control Room</h2><p>Ship faster. See every signal.</p></div><button class="devops-deploy" data-action="deploy">Deploy release</button></header>
                    <section class="devops-metrics" aria-label="Pipeline metrics">
                        <article class="devops-metric"><span>PIPELINES</span><strong>${String(this.pipelines.length).padStart(2, '0')}</strong><small>tracked projects</small></article>
                        <article class="devops-metric is-green"><span>PASSING</span><strong>${String(count('success')).padStart(2, '0')}</strong><small>healthy builds</small></article>
                        <article class="devops-metric is-cyan"><span>IN FLIGHT</span><strong>${String(active).padStart(2, '0')}</strong><small>active pipelines</small></article>
                        <article class="devops-metric ${count('failed') ? 'is-red' : 'is-green'}"><span>NEEDS ATTENTION</span><strong>${String(count('failed')).padStart(2, '0')}</strong><small>failed checks</small></article>
                    </section>
                    <section class="devops-grid">
                        <article class="devops-panel"><div class="devops-panel-title"><div><span class="devops-eyebrow">CONTINUOUS INTEGRATION</span><h3>Pipeline runs</h3></div><span class="devops-live"><i></i> LIVE</span></div>
                            <div class="devops-table-wrap"><table><thead><tr><th>PROJECT</th><th>BRANCH / COMMIT</th><th>STATUS</th><th>DURATION</th><th>LAST RUN</th><th></th></tr></thead><tbody>${this.pipelines.map((pipeline) => `<tr><td><strong>${safe(pipeline.name)}</strong></td><td><span>${safe(pipeline.branch)}</span><code>${safe(pipeline.commit)}</code></td><td><span class="devops-status status-${safe(pipeline.status)}"><i></i>${statusNames[pipeline.status] || 'Queued'}</span></td><td>${safe(pipeline.duration)}</td><td>${safe(pipeline.ago)}</td><td><button class="devops-rerun" data-action="rerun" data-id="${safe(pipeline.id)}" aria-label="Rerun ${safe(pipeline.name)}">↻</button></td></tr>`).join('')}</tbody></table></div>
                        </article>
                        <article class="devops-panel"><div class="devops-panel-title"><div><span class="devops-eyebrow">PRODUCTION</span><h3>Service health</h3></div><span class="devops-health-state"><i></i> Operational</span></div>
                            <div class="devops-service"><span class="devops-service-icon">N</span><div><strong>neoncity-web</strong><small>Production · HTTP</small></div><span class="devops-service-ok">99.98%</span></div>
                            <div class="devops-service"><span class="devops-service-icon is-purple">A</span><div><strong>assets-cdn</strong><small>Global edge · CDN</small></div><span class="devops-service-ok">99.99%</span></div>
                            <div class="devops-service"><span class="devops-service-icon is-blue">C</span><div><strong>ci-runner</strong><small>Build fleet · CI</small></div><span class="devops-service-ok">Healthy</span></div>
                            <div class="devops-chart-title"><span>RESPONSE TIME</span><strong>124 <small>ms avg</small></strong></div><div class="devops-chart" aria-label="Response time trend">${[35, 48, 41, 62, 55, 72, 50, 68, 44, 82, 64, 91, 72, 56, 78, 63, 95, 73, 84, 66, 100, 75, 87, 61].map((height) => `<i style="height:${height}%"></i>`).join('')}</div>
                        </article>
                    </section>
                    <section class="devops-panel"><div class="devops-panel-title"><div><span class="devops-eyebrow">ACTIVITY STREAM</span><h3>Recent events</h3></div><button class="devops-clear" data-action="clear">Clear</button></div><div class="devops-log-list">${this.logs.length ? this.logs.map((log) => `<div class="devops-log"><span class="log-${safe(log.level.toLowerCase())}">${safe(log.level)}</span><span>${safe(log.text)}</span><time>${safe(log.time || 'just now')}</time></div>`).join('') : '<div class="devops-log">No recent events.</div>'}</div></section>
                    <footer class="devops-footer"><span>NEONCITY DEVOPS · CONTROL PLANE</span><span>Demo data only · No external deployment is connected</span></footer>
                </div>`;
            app.querySelectorAll('[data-action]').forEach((button) => button.addEventListener('click', () => this.action(button.dataset.action, button.dataset.id)));
        }

        action(action, id) {
            if (action === 'rerun') {
                const pipeline = this.pipelines.find((item) => item.id === id);
                if (!pipeline || pipeline.status === 'running') return;
                pipeline.status = 'running';
                pipeline.ago = 'Running now';
                this.logs.unshift({ level: 'INFO', text: `${pipeline.name} · Pipeline run queued.` });
                this.save();
                this.render();
                window.setTimeout(() => {
                    const current = this.pipelines.find((item) => item.id === id);
                    if (!current) return;
                    current.status = 'success';
                    current.duration = '1m 24s';
                    current.ago = 'just now';
                    this.logs.unshift({ level: 'PASS', text: `${current.name} · Demo pipeline completed successfully.` });
                    this.save();
                    this.render();
                }, 1600);
            } else if (action === 'deploy') {
                this.logs.unshift({ level: 'INFO', text: 'Deploy action is a demo. Connect a deployment provider to ship for real.' });
                this.render();
            } else if (action === 'clear') {
                this.logs = [];
                this.render();
            }
        }
    }

    window.devOpsDashboard = new DevOpsDashboard();
})();
