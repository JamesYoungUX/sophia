# DNS Configuration for Preview Environment

# Create A records for preview deployment slots
resource "cloudflare_dns_record" "preview_slots" {
  for_each = toset(local.preview_slots)

  zone_id = var.cloudflare_zone_id
  name    = each.value
  type    = "A"
  content = "192.0.2.1"
  ttl     = 1 # Auto TTL
  proxied = true
  comment = "Preview deployment slot"
}

# Main application domains
resource "cloudflare_pages_domain" "app_domain" {
  account_id   = var.cloudflare_account_id
  project_name = "sophia-app"
  name         = "app.jyoung2k.org"
}

resource "cloudflare_dns_record" "app_subdomain" {
  zone_id    = var.cloudflare_zone_id
  name       = "app"
  type       = "CNAME"
  content    = "c3ad6a0e.sophia-app.pages.dev"
  ttl        = 1 # Auto TTL
  proxied    = true
  comment    = "React application"
  depends_on = [cloudflare_pages_domain.app_domain]
}

resource "cloudflare_dns_record" "www_subdomain" {
  zone_id = var.cloudflare_zone_id
  name    = "www"
  type    = "CNAME"
  content = "b851603b.sophia-web-by8.pages.dev"
  ttl     = 1 # Auto TTL
  proxied = true
  comment = "Web application"
}
