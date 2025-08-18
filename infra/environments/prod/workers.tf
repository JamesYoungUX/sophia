# Cloudflare Workers Configuration

# API Worker
resource "cloudflare_workers_script" "api" {
  account_id = var.cloudflare_account_id
  name       = "${var.project_name}-api"
  content    = file("../../../apps/api/dist/index.js")

  kv_namespace_binding {
    name         = "CACHE"
    namespace_id = cloudflare_workers_kv_namespace.cache.id
  }

  hyperdrive_config_binding {
    name    = "HYPERDRIVE"
    binding = module.hyperdrive.hyperdrive_id
  }

  secret_text_binding {
    name = "BETTER_AUTH_SECRET"
    text = var.better_auth_secret
  }

  secret_text_binding {
    name = "GOOGLE_CLIENT_ID"
    text = var.google_client_id
  }

  secret_text_binding {
    name = "GOOGLE_CLIENT_SECRET"
    text = var.google_client_secret
  }

  secret_text_binding {
    name = "OPENAI_API_KEY"
    text = var.openai_api_key
  }

  plain_text_binding {
    name = "APP_NAME"
    text = var.project_name
  }

  plain_text_binding {
    name = "ENVIRONMENT"
    text = "production"
  }
}

# Edge Worker
resource "cloudflare_workers_script" "edge" {
  account_id = var.cloudflare_account_id
  name       = "${var.project_name}-edge"
  content    = file("../../../apps/edge/dist/index.js")

  kv_namespace_binding {
    name         = "CACHE"
    namespace_id = cloudflare_workers_kv_namespace.cache.id
  }

  hyperdrive_config_binding {
    name    = "HYPERDRIVE"
    binding = module.hyperdrive.hyperdrive_id
  }

  plain_text_binding {
    name = "APP_NAME"
    text = var.project_name
  }

  plain_text_binding {
    name = "ENVIRONMENT"
    text = "production"
  }
}

# Custom domains for workers
resource "cloudflare_workers_domain" "api" {
  count      = var.domain_name != "" ? 1 : 0
  account_id = var.cloudflare_account_id
  hostname   = "api.${var.domain_name}"
  service    = cloudflare_workers_script.api.name
  zone_id    = var.cloudflare_zone_id
}

resource "cloudflare_workers_domain" "edge" {
  count      = var.domain_name != "" ? 1 : 0
  account_id = var.cloudflare_account_id
  hostname   = "edge.${var.domain_name}"
  service    = cloudflare_workers_script.edge.name
  zone_id    = var.cloudflare_zone_id
}
