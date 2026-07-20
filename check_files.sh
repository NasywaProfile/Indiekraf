grep -rnE "(Indonesia|Kreatif|Konsultasi|Desain|Website|Kami|Layanan)" src/components/ | awk -F: '{print $1}' | sort | uniq -c
