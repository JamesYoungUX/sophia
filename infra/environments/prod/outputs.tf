output "hyperdrive_id" {
  description = "Hyperdrive configuration ID"
  value       = module.hyperdrive.hyperdrive_id
}

output "kv_namespace_id" {
  description = "KV namespace ID for cache"
  value       = cloudflare_workers_kv_namespace.cache.id
}

# Pages outputs
output "web_pages_url" {
  description = "Web app Cloudflare Pages URL"
  value       = cloudflare_pages_project.web.subdomain
}

output "app_pages_url" {
  description = "App Cloudflare Pages URL"
  value       = cloudflare_pages_project.app.subdomain
}

# Workers outputs
output "api_worker_url" {
  description = "API Worker URL"
  value       = var.domain_name != "" ? "https://api.${var.domain_name}" : "https://${cloudflare_workers_script.api.name}.${var.cloudflare_account_id}.workers.dev"
}

output "edge_worker_url" {
  description = "Edge Worker URL"
  value       = var.domain_name != "" ? "https://edge.${var.domain_name}" : "https://${cloudflare_workers_script.edge.name}.${var.cloudflare_account_id}.workers.dev"
}

# Custom domains
output "web_domain" {
  description = "Web app domain"
  value       = var.domain_name != "" ? var.domain_name : cloudflare_pages_project.web.subdomain
}

output "app_domain" {
  description = "App domain"
  value       = var.domain_name != "" ? "app.${var.domain_name}" : cloudflare_pages_project.app.subdomain
}
