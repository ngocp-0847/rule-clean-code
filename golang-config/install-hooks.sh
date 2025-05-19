#!/bin/bash
# Script cài đặt git hooks cho dự án Go
# Đặt file này tại golang-config/

set -e

# Màu sắc
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
NC='\033[0m' # No Color

# Lấy đường dẫn thư mục hiện tại (golang-config)
CONFIG_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Kiểm tra tham số đầu vào
if [ -z "$1" ]; then
  echo -e "${YELLOW}Usage: $0 <path-to-go-project>${NC}"
  echo -e "Ví dụ: $0 /home/user/go-project"
  exit 1
fi

GO_PROJECT_PATH="$1"

# Kiểm tra xem đường dẫn có tồn tại không
if [ ! -d "$GO_PROJECT_PATH" ]; then
  echo -e "${RED}❌ Thư mục dự án không tồn tại: $GO_PROJECT_PATH${NC}"
  exit 1
fi

# Kiểm tra xem thư mục có phải là một git repository không
if [ ! -d "$GO_PROJECT_PATH/.git" ]; then
  echo -e "${RED}❌ Thư mục dự án không phải là một git repository: $GO_PROJECT_PATH${NC}"
  echo -e "${YELLOW}Hãy khởi tạo git repository trước khi cài đặt git hooks:${NC}"
  echo -e "  cd $GO_PROJECT_PATH && git init"
  exit 1
fi

# Tạo thư mục git hooks nếu chưa tồn tại
mkdir -p "$GO_PROJECT_PATH/.git/hooks"

# Sao chép pre-commit hook
echo -e "${YELLOW}Đang cài đặt pre-commit hook...${NC}"
cp "$CONFIG_DIR/git-hooks/pre-commit" "$GO_PROJECT_PATH/.git/hooks/"
chmod +x "$GO_PROJECT_PATH/.git/hooks/pre-commit"

# Cập nhật đường dẫn CONFIG_PATH trong pre-commit hook
sed -i "s|CONFIG_PATH=\"/home/phan.ngoc@sun-asterisk.com/Documents/projects/rule-clean-code/golang-config\"|CONFIG_PATH=\"$CONFIG_DIR\"|g" "$GO_PROJECT_PATH/.git/hooks/pre-commit"

# Sao chép cấu hình golangci-lint
echo -e "${YELLOW}Đang sao chép cấu hình golangci-lint...${NC}"
cp "$CONFIG_DIR/.golangci.yml" "$GO_PROJECT_PATH/"

echo -e "${GREEN}✅ Đã cài đặt git hooks thành công!${NC}"
echo -e "${YELLOW}Pre-commit hook đã được cài đặt tại:${NC} $GO_PROJECT_PATH/.git/hooks/pre-commit"
echo -e "${YELLOW}File cấu hình golangci-lint đã được sao chép tại:${NC} $GO_PROJECT_PATH/.golangci.yml"
