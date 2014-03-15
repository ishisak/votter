TESTS = tests/*.js
REPORTER = dot

test:
	@COVERAGE_MODULE_STUDY=
	@UNIT_TEST=1 NODE_ENV=test mocha \
		--reporter $(REPORTER) \
		--timeout 0 \
		--growl \
		$(TESTS)

test-watch:
	@UNIT_TEST=1 NODE_ENV=test mocha \
		--reporter $(REPORTER) \
		--timeout 0 \
		--growl \
		--watch \
		$(TESTS)

test-coverage: lib-coverage
	@mkdir -p build/coverage
	@COVERAGE_MODULE_STUDY=1 $(MAKE) test REPORTER=html-cov > build/coverage/index.html

lib-coverage:
	@rm -rf lib-cov
	@jscoverage lib lib-cov

docs:
	@mkdir -p build/api
	@yuidoc

clean:
	@rm -rf lib-cov build

.PHONY: test test-watch
