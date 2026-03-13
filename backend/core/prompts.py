def sentinel_crawl_reasoning(endpoints_found: int, forms_found: int) -> str:
    return (
        f"You are a penetration tester. You just crawled a web application and found "
        f"{endpoints_found} exposed endpoints and {forms_found} input forms. "
        f"In exactly 2 sentences, describe the attack surface like a hacker quietly "
        f"assessing their options — clinical, precise, slightly ominous. "
        f"Do not use bullet points. No preamble. Just the 2 sentences."
    )


def sentinel_header_reasoning(missing_headers: list) -> str:
    headers_str = ", ".join(missing_headers) if missing_headers else "none"
    return (
        f"You are a senior security engineer. The following HTTP security headers are "
        f"missing from this application: {headers_str}. "
        f"In exactly 2 sentences, explain what this means for real-world exploitability "
        f"— speak as a technical expert who has seen these exact gaps get exploited. "
        f"No preamble. No bullet points. Just 2 sentences."
    )


def sentinel_load_reasoning(breaking_point: int, error_rate: float) -> str:
    return (
        f"You are an infrastructure engineer watching a load test in real time. "
        f"The system started failing at {breaking_point} concurrent users with a "
        f"{error_rate:.1f}% error rate. "
        f"In exactly 2 sentences, describe what is likely happening inside the system "
        f"right now and what breaks first — speak like someone watching logs scroll. "
        f"No preamble. No bullet points. Just 2 sentences."
    )


def sentinel_fuzz_reasoning(vulnerability_type: str, location: str) -> str:
    return (
        f"You are a security researcher. You just confirmed a {vulnerability_type} "
        f"vulnerability at {location} using automated fuzzing. "
        f"In exactly 2 sentences, describe the real-world consequence of this specific "
        f"vulnerability — serious, urgent, no hedging. "
        f"No preamble. No bullet points. Just 2 sentences."
    )


def stranger_firstimpression_reasoning(page_text: str) -> str:
    truncated = page_text[:800] if len(page_text) > 800 else page_text
    return (
        f"You are a non-technical person visiting this website for the first time. "
        f"Here is what you see: '{truncated}'. "
        f"In exactly 2 sentences, describe whether you understood what this product "
        f"does within 5 seconds — be honest, slightly frustrated if it's unclear, "
        f"speak like a real human not a reviewer. "
        f"No preamble. No bullet points. Just 2 sentences."
    )


def stranger_ux_reasoning(issue_found: str) -> str:
    return (
        f"You are a real user who just hit this problem on a website: '{issue_found}'. "
        f"In exactly 2 sentences, describe how this made you feel and what you did next "
        f"— speak like a human who just got confused or gave up, not like a UX report. "
        f"No preamble. No bullet points. Just 2 sentences."
    )


def oracle_business_reasoning(page_text: str) -> str:
    truncated = page_text[:1000] if len(page_text) > 1000 else page_text
    return (
        f"You are a seasoned investor who has seen 500 pitches. "
        f"Here is a startup's landing page: '{truncated}'. "
        f"In exactly 3 sentences, give your honest assessment: "
        f"Is the value proposition clear? Is there evidence of traction? "
        f"What is the single biggest business risk you see? "
        f"Be direct and unimpressed unless it genuinely earns your respect. "
        f"No preamble. No bullet points. Just 3 sentences."
    )


def generate_verdict(
    sentinel_score: int,
    stranger_score: int,
    oracle_score: int,
    top_findings: list
) -> str:
    findings_str = "; ".join(top_findings[:3]) if top_findings else "no major findings"
    return (
        f"You are writing the final verdict for a web application audit. "
        f"Security score: {sentinel_score}/100. "
        f"UX score: {stranger_score}/100. "
        f"Business score: {oracle_score}/100. "
        f"Top issues found: {findings_str}. "
        f"Write ONE single sentence that summarizes the fate of this product. "
        f"It must reference the actual scores and actual findings. "
        f"It must be brutally specific — no generic statements, no filler words. "
        f"Model your tone on: 'Strong technical foundation destroyed by a signup flow "
        f"that loses 70% of users before they reach the core product.' "
        f"Return only the sentence. Nothing else."
    )


def generate_fixes(all_findings: list) -> str:
    findings_str = "\n".join(
        [f"- [{f.get('severity', 'LOW')}] {f.get('text', '')}" for f in all_findings[:10]]
    )
    return (
        f"You are a senior consultant who just audited a web application. "
        f"These are the findings:\n{findings_str}\n\n"
        f"Return a JSON array of exactly 5 objects. "
        f"Each object must have these exact keys: "
        f"'fix' (specific action, not generic advice), "
        f"'impact' (HIGH / MEDIUM / LOW), "
        f"'effort' (1 day / 1 week / 1 month). "
        f"Rank them by impact descending. "
        f"Return only valid JSON. No explanation. No markdown. No preamble."
    )