# Cloudflare Pages Configuration for Production

resource "cloudflare_pages_project" "sophia" {
  account_id        = var.cloudflare_account_id
  name              = "${var.project_name}-web"
  production_branch = "main"

  source {
    type = "github"
    config {
      owner                         = "JamesYoungUX"
      repo_name                     = "sophia"
      production_branch             = "main"
      pr_comments_enabled           = true
      deployments_enabled           = true
      production_deployment_enabled = true
      preview_deployment_setting    = "custom"
      preview_branch_includes       = ["sophia-v2", "staging", "develop"]
    }
  }

  build_config {
    build_command       = "bun run build"
    destination_dir     = "apps/web/dist"
    root_dir            = ""
    web_analytics_tag   = var.ga_measurement_id
    web_analytics_token = var.ga_measurement_id
  }

  deployment_configs {
    preview {
      environment_variables = {
        NODE_VERSION = "18"
        APP_NAME     = var.project_name
        ENVIRONMENT  = "preview"
      }
    }
    production {
      environment_variables = {
        NODE_VERSION = "18"
        APP_NAME     = var.project_name
        ENVIRONMENT  = "production"
      }
    }
  }
}

# Custom domain for production
resource "cloudflare_pages_domain" "sophia" {
  count      = var.domain_name != "" ? 1 : 0
  account_id = var.cloudflare_account_id
  project_name = cloudflare_pages_project.sophia.name
  domain     = var.domain_name
}

# DNS record for custom domain
resource "cloudflare_record" "sophia_cname" {
  count   = var.domain_name != "" && var.cloudflare_zone_id != "" ? 1 : 0
  zone_id = var.cloudflare_zone_id
  name    = "@"
  content = cloudflare_pages_project.sophia.subdomain
  type    = "CNAME"
  proxied = true
}
