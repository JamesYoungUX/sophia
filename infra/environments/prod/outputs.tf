output "hyperdrive_id" {
  description = "Hyperdrive configuration ID"
  value       = module.hyperdrive.hyperdrive_id
}

output "kv_namespace_id" {
  description = "KV namespace ID for cache"
  value       = cloudflare_workers_kv_namespace.cache.id
}

output "pages_url" {
  description = "Cloudflare Pages URL"
  value       = cloudflare_pages_project.sophia.subdomain
}

output "pages_project_name" {
  description = "Cloudflare Pages project name"
  value       = cloudflare_pages_project.sophia.name
}

output "custom_domain" {
  description = "Custom domain for the site"
  value       = var.domain_name != "" ? var.domain_name : cloudflare_pages_project.sophia.subdomain
}
