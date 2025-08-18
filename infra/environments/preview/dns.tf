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
resource "cloudflare_dns_record" "app_subdomain" {
  zone_id = var.cloudflare_zone_id
  name    = "app"
  type    = "CNAME"
  content = "5a5eb1c2.sophia-app.pages.dev"
  ttl     = 1 # Auto TTL
  proxied = true
  comment = "React application"
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
