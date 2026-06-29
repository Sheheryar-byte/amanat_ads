# AZURE_CREDENTIALS (required for GitHub Actions → Azure VMSS deployment)
# Generate this with:
#   az ad sp create-for-rbac \
#     --name "github-amanat-ads" \
#     --role Contributor \
#     --scopes /subscriptions/<YOUR_SUB_ID>/resourceGroups/rg-amanat-ads \
#     --sdk-auth
#
# Paste the entire JSON output as the value of AZURE_CREDENTIALS in:
# GitHub repo → Settings → Secrets and variables → Actions → New repository secret
#
# The JSON looks like:
# {
#   "clientId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
#   "clientSecret": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
#   "subscriptionId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
#   "tenantId": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx",
#   "activeDirectoryEndpointUrl": "https://login.microsoftonline.com",
#   "resourceManagerEndpointUrl": "https://management.azure.com/",
#   ...
# }

AZURE_CREDENTIALS=<paste full JSON from az ad sp create-for-rbac --sdk-auth>
