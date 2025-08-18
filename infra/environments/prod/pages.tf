# Cloudflare Pages Configuration for Production

# Web App (Astro)
resource "cloudflare_pages_project" "web" {
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
    build_command       = "cd apps/web && bun run build"
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

# React App (TanStack Router)
resource "cloudflare_pages_project" "app" {
  account_id        = var.cloudflare_account_id
  name              = "${var.project_name}-app"
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
    build_command       = "cd apps/app && bun run build"
    destination_dir     = "apps/app/dist"
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

# Custom domains for production
resource "cloudflare_pages_domain" "web" {
  count        = var.domain_name != "" ? 1 : 0
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.web.name
  domain       = var.domain_name
}

resource "cloudflare_pages_domain" "app" {
  count        = var.domain_name != "" ? 1 : 0
  account_id   = var.cloudflare_account_id
  project_name = cloudflare_pages_project.app.name
  domain       = "app.${var.domain_name}"
}

# DNS records for custom domains
resource "cloudflare_record" "web_cname" {
  count   = var.domain_name != "" && var.cloudflare_zone_id != "" ? 1 : 0
  zone_id = var.cloudflare_zone_id
  name    = "@"
  content = cloudflare_pages_project.web.subdomain
  type    = "CNAME"
  proxied = true
}

resource "cloudflare_record" "app_cname" {
  count   = var.domain_name != "" && var.cloudflare_zone_id != "" ? 1 : 0
  zone_id = var.cloudflare_zone_id
  name    = "app"
  content = cloudflare_pages_project.app.subdomain
  type    = "CNAME"
  proxied = true
}
